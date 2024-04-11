# Project: Automated Fresh Fruit Bunch Ripeness Grading System Using Deep Learning and Computer Vision Techniques


Team Members: 
1. Ivan Lok (Project Manager)
2. Ong Kai Yun (Quality Assurance)
3. Yong J-Hshen (Technical Lead)

Supervisor:
Lim Mei Kuan

This repository contains our final year computer science project focused on the classification of Fresh Fruit Bunches (FFB) based on their ripeness levels. Using deep learning techniques, we aim to automate the ripeness detection process, offering potential benefits for precision agriculture. Specifically, we implemented two models **YOLOv8** and **Detectron2 Faster R-CNN**, and integrate the models into our **Graphical User Interface**.

## Software Setup and Installation
To get started with the project, please follow these steps:

**1. Clone the Project Repository:**
- Clone the project repository by running the following command.
```
git clone https://git.infotech.monash.edu/mds11/palm-oil/
```

**2. Install Dependencies:**
- Use the requirements.txt file to install all project dependencies by running the following command.
```
pip install -r requirements.txt
```

**3. Download Datasets:**
- Note that due to size limitations set by GitLab, datasets are not included in the repository. Instead, download the dataset from the Google Drive folder. https://drive.google.com/drive/folders/1XGr7MnaFE5qTsDeNMpfQDuKrt2lM_Qhj?usp=sharing
- Alternatively, you can download the dataset from Roboflow using the following links:
    - For YOLOv8 format: https://app.roboflow.com/ds/mxwcKWjqAK?key=2TEG0AGuIT
    - For COCO format for Detectron2: https://app.roboflow.com/ds/OgSZPDKkPC?key=nXId0RyGce

## Frontend Setup 
**1. Navigate to the `frontend` directory:**
- Open the VS Code terminal.
- Use the `cd` command to navigate to the `src` folder in the cloned repository.

```
cd path/to/palm-oil/frontend/src
```

**2. Run the GUI JavaScript file:**

After navigating to the project directory, follow these instructions to run the GUI:

If you have already installed the necessary dependencies using `npm install`, you can directly execute `npm start`. However, if you haven't installed the dependencies, follow these additional steps:

1. Execute `npm install` to install the required dependencies.
2. Execute `npm install react-leaflet` to install react dependencies.
3. After the installation is completed, run `npm build` to prepare the project for execution.
4. Run `npm start` to start the project.

## Backend (Server) Setup 

Other than the frontend, we need a server to handle the business logic, data processing, and communication with the backend services, ensuring a seamless and functional web application.

## Steps for setting up Detectron2

**1. Install `detectron2`**
```
git clone https://github.com/facebookresearch/detectron2 detectron2_repo
pip install -e detectron2_repo
```

**2. Navigate to the `backend` directory**
- Use the cd command to navigate to the directory where the api.py script is located. In the cloned repository, you can navigate it to:
```
cd /path/to/palm-oil/backend
```

**3. Run `detectron.py`**
- After you've installed Detectron2, run `detectron.py` to run the server for object detection using Detectron2. Run the following command:
```
python detectron.py
```

## Steps for setting up YOLOv8

**1. Navigate to the `backend` directory**
- Use the cd command to navigate to the directory where the api.py script is located. In the cloned repository, you can navigate it to:
```
cd /path/to/palm-oil/backend
```

**2. Run `api.py`**
- After you've installed Detectron2, run `api.py` to run the server for object detection using Detectron2. Run the following command:
```
python api.py
```

NOTE: If you are unable to download the Detectron2 model weight file from `model/detectron2/output/model_1696362723.pth`, kindly download the file via this link https://drive.google.com/file/d/18icliLWCOLagFYu_CavmBsJalRg_vROg/view?usp=sharing


