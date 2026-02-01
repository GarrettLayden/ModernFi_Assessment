# ModernFi_Assessment

This application has been created to satisfy the requirements of ModernFi's Take Home Prompt, which include:
* Pulling data on treasury yields and plotting the yield curve for you to view
* Creating an order for a specific term and amount
* Viewing the historical order submissions

## Running Application

### Pre-requisites
Must have Git, Node.js, and npm installed on your device
* [Git] https://git-scm.com/install/
* [Node.js] https://nodejs.org/en/download (includes npm install)

### Installation

1. **Clone the repository**
    * ```git clone https://github.com/GarrettLayden/ModernFi_Assessment.git```

2. **Install dependencies**
    * Navigate to ```\assessments``` root in terminal (```cd .\assessment\```)
    * run ```npm install```

3. **Start Application**
    * run ```npm run start```
    * Open http://localhost:3000/ in your web browser


## Known Issues
* The API that is called to fetch treasury yield data is NOT updated on the weekends, making it unable to view the treasury yield curve on a weekend