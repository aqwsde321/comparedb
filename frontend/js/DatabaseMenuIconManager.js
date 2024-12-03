import { sqlQueries } from './sqlQueries.js';

export class DatabaseMenuIconManager {
    constructor(dbList, id, img, options = {}) {
        this.dbList = dbList;
        this.id = id || 'db-menu';
        this.img = img || 'img/computer_16554361.png';
        this.namespace = options.namespace || 'custom-db-manager';
        this.init();
    }

    init() {
        this.createStyles();
        this.createIconImg();
        this.createDbList();
        this.createModal();
        this.attachEventListeners();
        this.showGuidePopup();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .${this.namespace}.dbIcon {
                position: fixed;
                left: 20px;
                top: 20px;
                cursor: pointer;
                width: 32px;
                height: auto;
                z-index: 1049;
            }

            .${this.namespace}.db-list-container {
                position: fixed;
                left: 70px;
                top: 20px;
                display: none;
                z-index: 1050;
            }

            .${this.namespace}.db-list-container.show {
                display: block;
            }

            .${this.namespace} .db-list {
                min-width: 200px;
                max-height: 400px;
                overflow-y: auto;
            }

            .${this.namespace} .list-group-item {
                cursor: pointer;
            }

            .${this.namespace} .modal-dialog {
                max-width: 90%;
            }

            .${this.namespace} .table-responsive {
                max-height: 70vh;
            }

            .${this.namespace} .table thead th {
                position: sticky;
                top: 0;
                background: var(--bs-table-bg);
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    }

    createIconImg() {
        const icon = document.createElement('img');
        icon.src = this.img;
        icon.className = `${this.namespace} dbIcon`;
        icon.id = 'dbIcon';
        icon.alt = 'Database Icon';

        const dbMenu = document.getElementById(this.id);
        dbMenu.appendChild(icon);
    }

    createDbList() {
        const container = document.createElement('div');
        container.className = `${this.namespace} db-list-container`;

        const ul = document.createElement('ul');
        ul.className = 'db-list list-group shadow';

        this.dbList.forEach(dbName => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.textContent = dbName;
            li.dataset.dbName = dbName;
            ul.appendChild(li);
        });

        container.appendChild(ul);
        const dbMenu = document.getElementById(this.id);
        dbMenu.appendChild(container);
        this.listContainer = container;
        this.listElement = ul;
    }

    createModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = `modal fade ${this.namespace}`;
        modalOverlay.setAttribute('tabindex', '-1');
        modalOverlay.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle" >Database Tables</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="tableContainer" class="table-responsive"></div>
                    </div>
                </div>
            </div>
        `;

        const dbMenu = document.getElementById(this.id);
        dbMenu.appendChild(modalOverlay);
        this.modalOverlay = modalOverlay;
        this.modal = new bootstrap.Modal(modalOverlay);
    }

    attachEventListeners() {
        const dbIcon = document.getElementById('dbIcon');

        dbIcon.addEventListener('click', (e) => {
            //e.stopPropagation(); 
            this.listContainer.classList.toggle('show');
        });

        this.listElement.addEventListener('click', async (e) => {
            if (e.target.tagName === 'LI') {
                const dbName = e.target.dataset.dbName;
                await this.showModal(dbName);
            }
        });

        this.modalOverlay.querySelector('.btn-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.addEventListener('click', (e) => {
            if (!dbIcon.contains(e.target) && !this.listContainer.contains(e.target)) {
                this.listContainer.classList.remove('show');
            }
        });
    }

    async showModal(dbName) {
        this.modal.show();
        this.listContainer.classList.remove('show');
        const modalTitle = document.getElementById('modalTitle');
        modalTitle.innerHTML = `${dbName} Database Tables`
        const tableContainer = document.getElementById('tableContainer');
        // tableContainer.innerHTML = `
        //     <div class="text-center py-4">
        //         <div class="spinner-border text-primary" role="status">
        //             <span class="visually-hidden">Loading...</span>
        //         </div>
        //     </div>
        // `;
        const sqlQuery = sqlQueries[dbName];

        if (sqlQuery) {
            tableContainer.innerHTML = `
                <div class="text p-4">
                    <div class="alert alert-info" role="alert">
                        [All databases had very similar table structures defined by DDL and used the same INSERT query.]
                    </div>
                    <div class="d-flex justify-content-center mb-4">
                        <img src="img/comparedb_erd_v1.png" alt="Database ERD" style="max-width: 100%; height: auto;">
                    </div>
                    <pre style="white-space: pre-wrap;"> 
                        ${sqlQuery}
                        ${sqlQueries.INSERT}
                    </pre>
                </div>
            `;
        } else {
            tableContainer.innerHTML = `
                <div class="text py-4">
                    <pre style="white-space: pre-wrap;">SQL Query for ${dbName} is not available.</pre>
                </div>
            `;
        }

    }


    // 가이드 팝업을 생성하는 함수
    showGuidePopup() {
        // 팝업 요소 생성
        const guidePopup = document.createElement("div");
        guidePopup.className = "guide-popup";
        guidePopup.innerText = "여기서 ERD와 DDL을 참고하여 데이터를 조회하는 연습을 진행할 수 있습니다. \nORACLE, MARIADB, POSTGRES에서 SELECT 쿼리 결과를 비교해 보세요.";

        // 팝업을 페이지에 추가
        document.body.appendChild(guidePopup);

        // 아무 곳이나 클릭하면 팝업 제거
        document.addEventListener("click", (event) => {
            guidePopup.remove();
        }, { once: true }); // 한 번만 실행되도록 설정
    }

    closeModal() {
        this.modal.hide();
    }


}