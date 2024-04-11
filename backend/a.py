from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import io, os, cv2, numpy as np, tempfile, uuid
from ultralytics import YOLO
from roboflow import Roboflow
from detectron2.structures import BoxMode
from detectron2.data import MetadataCatalog
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# YOLOv8 Model Configuration
yolo_model = YOLO("./best.pt")

# Roboflow Model Configuration
rf = Roboflow(api_key="bJD5L5g814T3E7Swc42v")
project = rf.workspace().project("palm-h39er")
roboflow_model = project.version(1).model

# Detectron2 Model Configuration
cfg = get_cfg()
cfg.merge_from_file("./detectron2_repo/configs/COCO-Detection/faster_rcnn_X_101_32x8d_FPN_3x.yaml")
cfg.MODEL.WEIGHTS = "./detectron2_repo/model_1696362723.pth"
cfg.DATALOADER.NUM_WORKERS = 2
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 5
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7
cfg.MODEL.DEVICE = "cuda"
classes = ['palm', 'Empty- Abnormal', 'Overripe', 'Ripe', 'Unripe- Underripe']
MetadataCatalog.get("oil_palm_train").set(thing_classes=classes)
detectron2_predictor = DefaultPredictor(cfg)


@app.route('/process_image_yolov8', methods=['POST'])
def process_local_yolo():
    image = request.files['image']
    
    # Convert the uploaded file to an image
    image = Image.open(io.BytesIO(image.read()))
    
    # Convert RGBA to RGB if necessary
    if image.mode == 'RGBA':
        image = image.convert('RGB')

    # Use a temp file for prediction
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp:
        image.save(temp.name, "JPEG")
        results = yolo_model.predict(temp.name, conf=0.7, iou=0.5)

    #Assuming that results contain only one image result
    r = results[0]
    im_array = r.plot()
    im = Image.fromarray(im_array[..., ::-1])  # Convert BGR to RGB

    # Save the image to a temp file
    output_temp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
    im.save(output_temp.name, "JPEG")

    return send_file(
        output_temp.name,
        mimetype='image/jpeg',
        as_attachment=True,
        download_name="output.jpg"
    )

@app.route('/process_image_roboflow', methods=['POST'])
def process_roboflow():
    image = request.files['image']
    
    
    # Extract original filename
    original_filename = os.path.splitext(image.filename)[0]
    output_filename = f"{original_filename}_output.jpeg"
    
    # Convert the uploaded file to an image
    image = Image.open(io.BytesIO(image.read()))
        
        # Convert RGBA to RGB
    if image.mode == 'RGBA':
        image = image.convert('RGB')


    # Check if "output" directory exists, if not, create it
    output_dir = "output"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Create a complete path for the output image
    output_path = os.path.join(output_dir, output_filename)
    
    # Save the image to the output directory
    image.save(output_path, "JPEG")  # Save the image

    # Process with your deep learning model
    prediction = roboflow_model.predict(output_path, confidence=40, overlap=30)
    
    # Save the prediction as an image (if needed)
    prediction_image_path = os.path.join(output_dir, output_filename)
    prediction.save(prediction_image_path)

    return send_file(
        prediction_image_path,
        mimetype='image/jpeg',
        as_attachment=True,
        download_name="output.jpg"
    )

@app.route('/process_image_detectron2', methods=['POST'])
def process_detectron2():
    try:
        uploaded_file = request.files['image']
        # Convert the uploaded file to an OpenCV image
        nparr = np.frombuffer(uploaded_file.read(), np.uint8)
        your_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Process the image with Detectron2
        outputs = detectron2_predictor(your_image)
        v = Visualizer(your_image[:, :, ::-1], MetadataCatalog.get("oil_palm_train"), scale=1.2)
        out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
        result_image = out.get_image()[:, :, ::-1]

        # Create the output directory if it doesn't exist
        output_directory = 'output'
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)

        # Save the result image to the "output" folder
        output_filename = os.path.join("output", "output.jpeg")
        cv2.imwrite(output_filename, result_image)

        # Optionally, you can still send the file back to the client
        return send_file(output_filename, mimetype='image/jpeg', as_attachment=True)
    
    except Exception as e:
        return str(e)  # Return the exception as a string to help with debugging.

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
