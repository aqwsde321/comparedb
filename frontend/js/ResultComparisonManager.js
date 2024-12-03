// ResultComparisonManager.js
//ResultComparisonManager class : 쿼리 결과 비교 담당
export class ResultComparisonManager {
    constructor(flexContainerId) {
        this.flexContainerId = flexContainerId;
        this.tbody1 = document.getElementById(`${flexContainerId}-1`);
        this.tbody2 = document.getElementById(`${flexContainerId}-2`);
    }

    compareResults() {
        if (!this.tbody1 || !this.tbody2) {
            console.error('Result tables not found for comparison');
            return;
        }

        this.resetComparisonHighlights(this.tbody1);
        this.resetComparisonHighlights(this.tbody2);

        this.compareTableRows(this.tbody1, this.tbody2);
    }

    resetComparisonHighlights(tbody) {
        tbody.querySelectorAll('td').forEach(cell => {
            cell.classList.remove('highlight-difference', 'highlight-missing');
            if (cell.querySelector('.difference-tooltip')) {
                cell.querySelector('.difference-tooltip').remove();
            }
        });
    }

    compareTableRows(tbody1, tbody2) {
        const rows1 = Array.from(tbody1.querySelectorAll('tr'));
        const rows2 = Array.from(tbody2.querySelectorAll('tr'));
        const maxRows = Math.max(rows1.length, rows2.length);

        for (let i = 0; i < maxRows; i++) {
            const row1 = rows1[i];
            const row2 = rows2[i];

            if (!row1 || !row2) {
                this.highlightMissingRow(row1 || row2);
                continue;
            }

            this.compareCells(row1, row2);
        }
    }

    compareCells(row1, row2) {
        const cells1 = Array.from(row1.querySelectorAll('td'));
        const cells2 = Array.from(row2.querySelectorAll('td'));
        const maxCells = Math.max(cells1.length, cells2.length);

        for (let i = 0; i < maxCells; i++) {
            const cell1 = cells1[i];
            const cell2 = cells2[i];

            if (!cell1 || !cell2) {
                this.highlightMissingCell(cell1 || cell2);
                continue;
            }

            const value1 = this.getCellValue(cell1);
            const value2 = this.getCellValue(cell2);

            if (value1 !== value2) {
                this.highlightDifference(cell1, cell2, value1, value2);
            }
        }
    }

    getCellValue(cell) {
        return cell.textContent.trim().replace(/\s+/g, ' ');
    }

    highlightDifference(cell1, cell2, value1, value2) {
        cell1.classList.add('highlight-difference');
        cell2.classList.add('highlight-difference');
        this.addDifferenceTooltip(cell1, value1, value2);
        this.addDifferenceTooltip(cell2, value2, value1);
    }

    addDifferenceTooltip(cell, thisValue, otherValue) {
        const tooltip = document.createElement('div');
        tooltip.className = 'difference-tooltip';
        tooltip.innerHTML = `
            This: ${this.escapeHtml(thisValue)}<br>
            Other: ${this.escapeHtml(otherValue)}
        `;
        cell.appendChild(tooltip);
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    highlightMissingRow(row) {
        if (row) {
            Array.from(row.querySelectorAll('td')).forEach(cell => {
                cell.classList.add('highlight-missing');
                this.addMissingTooltip(cell);
            });
        }
    }

    highlightMissingCell(cell) {
        if (cell) {
            cell.classList.add('highlight-missing');
            this.addMissingTooltip(cell);
        }
    }

    addMissingTooltip(cell) {
        const tooltip = document.createElement('div');
        tooltip.className = 'difference-tooltip';
        tooltip.textContent = 'No matching data in other result';
        cell.appendChild(tooltip);
    }
}
