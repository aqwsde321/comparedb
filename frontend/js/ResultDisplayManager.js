// ResultDisplayManager.js
import { ResultComparisonManager } from './ResultComparisonManager.js';

// ResultDisplayManager class : 쿼리 결과 table 만들기 담당
export class ResultDisplayManager {
    constructor(queryForm) {
        this.queryForm = queryForm;
        this.container = queryForm.closest('.query-container');
        this.tableHeader = this.container.querySelector('.tableHeader');
        this.tableBody = this.container.querySelector('.tableBody');
        this.explainTableHeader = this.container.querySelector('.explainTableHeader');
        this.explainTableBody = this.container.querySelector('.explainTableBody');
    }

    displayResults(data) {
        if (data.errorMessage) {
            this.displayError(data.errorMessage);
            return;
        }

        this.clearTables();
        this.updateQueryInput(data.filteredSql);
        this.displayResultTable(data.result);
        this.displayExplainTable(data.explainResult);
        this.handleExecutionFlags(data);
    }

    clearTables() {
        this.tableHeader.innerHTML = '';
        this.tableBody.innerHTML = '';
        this.explainTableHeader.innerHTML = '';
        this.explainTableBody.innerHTML = '';
    }

    displayError(error) {
        this.clearTables();
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="100%" class="text-danger">
                    ${error.message || error}
                </td>
            </tr>
            <tr>
                <td colspan="100%" class="text-danger">
                    ${error.response.data.errorMessage || ''}
                </td>
            </tr>            
        `;
    }

    updateQueryInput(filteredSql) {
        if (filteredSql) {
            this.queryForm.querySelector('.sqlQuery').value = filteredSql;
        }
    }

    displayResultTable(results) {
        this.displayTable(
            results,
            this.tableHeader,
            this.tableBody,
            'No results found'
        );
    }

    displayExplainTable(results) {
        this.displayTable(
            results,
            this.explainTableHeader,
            this.explainTableBody,
            'No EXPLAIN results found'
        );
    }

    displayTable(results, headerElement, bodyElement, emptyMessage) {
        if (!results || results.length === 0) {
            this.displayEmptyMessage(bodyElement, emptyMessage);
            return;
        }

        this.createTableHeader(results[0], headerElement);
        this.createTableBody(results, bodyElement);
    }

    createTableHeader(firstRow, headerElement) {
        Object.keys(firstRow).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            th.className = 'px-4 py-2 bg-gray-100';
            headerElement.appendChild(th);
        });
    }

    createTableBody(results, bodyElement) {
        results.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                td.style.whiteSpace = 'pre';
                td.className = 'px-4 py-2 border';
                tr.appendChild(td);
            });
            bodyElement.appendChild(tr);
        });
    }

    displayEmptyMessage(bodyElement, message) {
        bodyElement.innerHTML = `
            <tr>
                <td colspan="100%" class="text-center py-4 text-gray-500">
                    ${message}
                </td>
            </tr>
        `;
    }

    handleExecutionFlags(data) {
        if (!data.result) return;

        const flexContainerId = this.container.dataset.flexContainerId;
        const containerIndex = this.container.dataset.index;
        const flexContainer = document.getElementById(flexContainerId);

        // Set execution flag for current container
        flexContainer.dataset[`executeSql${containerIndex}`] = 'true';

        // Check if both containers have been executed
        if (flexContainer.dataset.executeSql1 === 'true' &&
            flexContainer.dataset.executeSql2 === 'true') {
            new ResultComparisonManager(flexContainerId).compareResults();
        }
    }
}
