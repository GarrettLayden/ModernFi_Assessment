$(document).ready(async function () {
    const yieldData = await readRecentTreasuryYieldData();
    createTreasuryYieldCurve(yieldData);
});
 
async function readRecentTreasuryYieldData() {
    const todaysDate = formatDate(new Date());

    return new Promise((resolve, reject) => {
        $.ajax({
            // url: _api.readRecentTreasuryYieldData.url,
            url: `${_api.getTreasuryYieldDataByRecentDate.url}?apikey=${_api.getTreasuryYieldDataByRecentDate.key}&from=2026-01-30`,
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
    $('#yieldDate').text(`Data as of ${formattedYieldData.todaysDate}`)
    const chartElement = document.getElementById('TreasuryYieldCurveChart').getContext('2d');

    const chartConfig = {
        type: 'line',
        data: {
            labels: formattedYieldData.yieldCurveLabels,
            datasets: [{
                label: 'Treasury Yield (%)',
                data: formattedYieldData.yieldCurveDataPoints,
                fill: true,
                tension: 0.2,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Maturity',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Yield Rate (%)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: false,
                    min: Math.floor(Math.min(...formattedYieldData.yieldCurveDataPoints) - 0.5),
                    max: Math.ceil(Math.max(...formattedYieldData.yieldCurveDataPoints) + 0.5)
                }
            }
        }
    }

    console.log(chartConfig);

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
            yieldCurveLabels.push(formatKeys(key));
            yieldCurveDataPoints.push(yieldData[key]);
        }
    }

    return {
        todaysDate,
        yieldCurveDataPoints,
        yieldCurveLabels
    }
}

// Converts API response keys to 'number-time' format (ex: 1-Month, 5-Year)
// Hard-Coded since API response is consistent
function formatKeys(key) {
    const labelMapping = {
        month1: '1-Month',
        month2: '2-Month',
        month3: '3-Month',
        month6: '6-Month',
        year1: '1-Year',
        year2: '2-Year',
        year3: '3-Year',
        year5: '5-Year',
        year7: '7-Year',
        year10: '10-Year',
        year20: '20-Year',
        year30: '30-Year'
    }

    return labelMapping[key];
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