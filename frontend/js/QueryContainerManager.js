// QueryContainerManager.js
import { QueryExecutor } from './QueryExecutor.js';
import { ResultDisplayManager } from './ResultDisplayManager.js';

// Query Container Manager Class : UI 컨테이너 관리
export class QueryContainerManager {
    constructor(dbList) {
        this.containerCount = 0;
        this.dbList = dbList;
        this.init();
    }

    init() {
        this.createQueryContainers();
        this.setupEventListeners();
    }

    createQueryContainers() {
        const queryContainersDiv = document.getElementById('queryContainers');
        this.containerCount++;

        const flexContainer = this.createFlexContainer();
        const toggleButton = this.createToggleButton(flexContainer);
        const queryContainers = this.createQueryContainerPair(flexContainer.id);

        queryContainersDiv.appendChild(toggleButton);
        queryContainers.forEach(container => flexContainer.appendChild(container));
        queryContainersDiv.appendChild(flexContainer);
    }

    createFlexContainer() {
        const flexContainer = document.createElement('div');
        flexContainer.id = `flexContainer${this.containerCount}`;
        flexContainer.style.display = 'flex';
        flexContainer.style.flexWrap = 'wrap';
        return flexContainer;
    }

    createToggleButton(flexContainer) {
        const number = this.containerCount
        const button = document.createElement('button');
        button.textContent = `Hide Query Set-${number}`;
        button.setAttribute('type', 'button');
        button.className = 'btn btn-outline-warning btn-sm mb-3';
        button.setAttribute('data-bs-toggle', 'button');

        // button.addEventListener('click', () => this.handleToggle(flexContainer));
        // 버튼 클릭 시 처리
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active'); // active 상태 확인
            // 버튼 텍스트 변경
            button.textContent = isActive
                ? `Show Query Set-${number}`
                : `Hide Query Set-${number}`;
            this.handleToggle(flexContainer);
        });
        return button;
    }

    handleToggle(flexContainer) {
        const isHidden = flexContainer.style.display === 'none';
        flexContainer.style.display = isHidden ? 'flex' : 'none';
    }

    createQueryContainerPair(flexContainerId) {
        return [
            this.createSingleQueryContainer(flexContainerId, 1),
            this.createSingleQueryContainer(flexContainerId, 2)
        ];
    }

    createSingleQueryContainer(flexContainerId, index) {
        const container = document.createElement('div');
        container.className = 'query-container mb-4';
        container.dataset.flexContainerId = flexContainerId;
        container.dataset.index = index;

        container.innerHTML = this.getQueryContainerTemplate(flexContainerId, index);
        this.populateDbList(container);

        return container;
    }

    getQueryContainerTemplate(flexContainerId, index) {
        const headerText = index === 1 ? 'Source' : 'Target';
        return `
            <form class="queryForm">
                <div class="mb-3">
                    <label class="form-label">${headerText} Database Type</label>
                    <select class="form-control dbType" required>
                        <option value="" disabled selected>Select a Database</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">SQL Query</label>
                    <textarea class="form-control sqlQuery" rows="4" required></textarea>
                </div>
                <div class="button-container mb-3 d-grid col-12 mx-auto">
                    <!-- 버튼 -->
                    <button type="submit" class="btn btn-outline-primary executeBtn">Execute</button>
                    
                    <!-- 로딩 스피너 -->
                    <div class="loading-spinner text-center" style="display: none;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </form>
            <div class="resultContainer">
                <h6 class="mt-3">Query Result</h6>
                <div class="tableContainer">
                    <table class="table resultTable">
                        <thead>
                            <tr class="tableHeader"></tr>
                        </thead>
                        <tbody id="${flexContainerId}-${index}" class="tableBody"></tbody>
                    </table>
                </div>

                <h6 class="mt-3">EXPLAIN Result</h6>
                <div class="tableContainer">
                    <table class="table explainTable">
                        <thead>
                            <tr class="explainTableHeader"></tr>
                        </thead>
                        <tbody class="explainTableBody"></tbody>
                    </table>
                </div>
            </div>
        `;
    }

    populateDbList(container) {
        const select = container.querySelector('.dbType');
        this.dbList.forEach(db => {
            const option = document.createElement('option');
            option.value = db;
            option.textContent = db;
            select.appendChild(option);
        });
    }

    setupEventListeners() {
        document.getElementById('addQueryBtn').addEventListener('click',
            () => this.createQueryContainers());

        document.getElementById('queryContainers').addEventListener('submit',
            async (event) => this.handleFormSubmit(event));
    }

    async handleFormSubmit(event) {
        if (!event.target.classList.contains('queryForm')) return;
        event.preventDefault();

        const form = event.target;
        const submitButton = form.querySelector('.executeBtn');
        const loadingSpinner = form.querySelector('.loading-spinner');
        // 버튼 숨기고 로딩 스피너 보여주기
        submitButton.style.display = 'none';
        loadingSpinner.style.display = 'block';

        const queryExecutor = new QueryExecutor(
            form.querySelector('.dbType').value,
            form.querySelector('.sqlQuery').value
        );

        try {
            const result = await queryExecutor.execute();
            new ResultDisplayManager(form).displayResults(result);
        } catch (error) {
            console.error('Error executing query:', error);
            new ResultDisplayManager(form).displayError(error);
        } finally {
            // 쿼리 실행 후, 로딩 스피너 숨기고 버튼 다시 보이기
            submitButton.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }
    }
}
