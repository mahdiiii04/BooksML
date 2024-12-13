# BooksML

BooksML is a machine learning project designed to build a **book recommendation system** using **association rule mining** techniques. This project covers the entire pipeline from data collection on the Goodreads website, preprocessing and cleaning, model development and evaluation, to deploying the model in a user-friendly application.

---

## Project Structure

The repository contains the following folders:

1. **`miniProjectData/`**
   - A Scrapy project used to collect review data from 200 different Goodreads users.
   - Outputs a `reviews.json` file containing over 10,000 reviews.

2. **`Association/`**
   - Contains the main notebook for:
     - Data preprocessing
     - Exploratory Data Analysis (EDA)
     - Model building and evaluation using association rule mining techniques.

3. **`Application/`**
   - Deployment files for the app.
   - Includes both the **backend** and **frontend** code.

---

## Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed on your system:
- **Python 3.8 or higher**
- **Node.js and npm**
- **Uvicorn** (for running the backend)
- **Git**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mahdiiii04/BooksML.git
   cd BooksML
2. Install Requirements:
   ```bash
    pip install -r requirements.txt
3. Setup Front End:
   ```bash
    cd Application/ML_Front
    npm install
    cd ../..
### Running The Application

1. Run Backend:
   ```bash
    cd Application
    uviron api:app
2. Run FrontEnd:
   ```bash
    cd Application/ML_Front
    npm run dev
## Features

* Data Collection: Scrapes over 10,000 reviews from Goodreads using Scrapy.

* Data Processing: Cleans and preprocesses the review data for analysis.

* Modeling: Implements an association rule mining-based recommendation system.

* Deployment: A fully functional app with a backend API and a responsive frontend.

## Notes

All required Python libraries are listed in requirements.txt and can be installed using pip.
Ensure your environment is set up with the necessary tools (e.g., Python, Uvicorn, npm).

## Contibutors

* Tahir Abderrahmane EL Mehdi
* Rahmoun Wassim
* Chaib Fakhreddine Fouzi