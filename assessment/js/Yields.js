$(document).ready(async function () {
    const yieldData = await readRecentTreasuryYieldData();
    createTreasuryYieldCurve(yieldData);
});
 
async function readRecentTreasuryYieldData() {
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