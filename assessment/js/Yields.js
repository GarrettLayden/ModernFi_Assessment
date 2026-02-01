$(document).ready(async function () {
    const yieldData = await readRecentTreasuryYieldData();
    createTreasuryYieldCurve(yieldData);
});
 
async function readRecentTreasuryYieldData() {
    const todaysDate = formatDate(new Date());

    return new Promise((resolve, reject) => {
        $.ajax({
            // url: _api.readRecentTreasuryYieldData.url,
            url: `https://financialmodelingprep.com/stable/treasury-rates?apikey=zb0MOk43QNunW5AfjtuTtFQO0H8LCTnX&from=2026-01-30`,
            type: "GET",
            cache: false,
            // headers: _api.readRecentTreasuryYieldData.key,
            success: function(data, textStatus, xhr) {
                resolve(data[0]);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error(errorThrown);
                reject(false);
            }
        })
    })
}

async function createTreasuryYieldCurve(yieldData) {    
    const formattedYieldData = formatYieldDataForYieldCurve(yieldData);
    const chartElement = document.getElementById('TreasuryYieldCurveChart').getContext('2d');

    const chartConfig = {
        type: 'line',
        data: {
            labels: formattedYieldData.yieldCurveLabels,
            datasets: [{
                label: 'Treasury Yield (%)',
                data: formattedYieldData.yieldCurveDataPoints
            }],
        }
    }

    return new Chart(chartElement, chartConfig);
}

function formatYieldDataForYieldCurve(yieldData) {
    if (yieldData === undefined || yieldData == null) {
        alert("There was an error fetching the treasury yield data. Please contact the software development team for more assistance.");
        return;
    }

    // Logic here is specific towards Treasury Yield API being used (not scalable per API)
    const todaysDate = yieldData.date;
    const yieldCurveDataPoints = [];
    const yieldCurveLabels = [];

    console.log('yield data: ', yieldData);

    for (let key in yieldData) {
        if (key !== 'date') {
            yieldCurveLabels.push(key);
            yieldCurveDataPoints.push(yieldData[key]);
        }
    }

    return {
        todaysDate,
        yieldCurveDataPoints,
        yieldCurveLabels
    }
}

function formatDate(date) {
    date = (date instanceof Date) ? date : new Date(date);

    let year = date.getFullYear();
    let month = convertToTwoDigits(date.getMonth() + 1);
    let day = convertToTwoDigits(date.getDate());

    console.log(`${year}-${month}-${day}`)

    return `${year}-${month}-${day}`;
}

function convertToTwoDigits(num) {
    return ("0" + num).slice(-2);
}