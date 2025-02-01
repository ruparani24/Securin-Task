document.addEventListener("DOMContentLoaded", () => {
    fetchCVEData();
});

function fetchCVEData() {
    const apiUrl = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCVEData(data.vulnerabilities || []);
        })
        .catch(error => console.error('Error fetching CVE data:', error));
}

function displayCVEData(cveList) {
    const tableBody = document.querySelector('#cve-table tbody');
    const totalRecords = document.getElementById('total-records');

    cveList.forEach(cve => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cve.cve.id}</td>
            <td>${cve.cve.descriptions[0]?.value || 'N/A'}</td>
            <td>${cve.cve.published || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });

    totalRecords.textContent = `Total Records: ${cveList.length}`;
}
