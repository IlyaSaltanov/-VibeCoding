// let csvData = [];

// document.getElementById('csvFile').addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (event) {
//         const text = event.target.result;
//         csvData = parseCSV(text);
//         console.log("Данные загружены:", csvData.length, "строк"); // Лог
//         populateYearSelect();
//     };
//     reader.onerror = function () {
//         alert("Ошибка чтения файла!");
//     };
//     reader.readAsText(file);
// });

// function parseCSV(text) {
//     const lines = text.trim().split('\n');
//     if (lines.length < 2) {
//         alert("Файл пуст или имеет неправильный формат!");
//         return [];
//     }

//     const headers = lines[0].split(',');
//     return lines.slice(1).map(line => {
//         const values = line.split(',');
//         return headers.reduce((obj, header, i) => {
//             obj[header.trim()] = values[i]?.trim() || '';
//             return obj;
//         }, {});
//     });
// }

// function populateYearSelect() {
//     const years = [...new Set(csvData.map(row => {
//         const date = row['order_date'];
//         if (!date) return null; // Пропускаем пустые даты
//         const yearMatch = date.match(/^\d{4}-\d{2}-\d{2}/); // Проверка формата YYYY-MM-DD
//         if (!yearMatch) return null;
//         return date.split('-')[0];
//     }).filter(Boolean))]; // Удаляем null

//     console.log("Годы из файла:", years); // Лог
//     const select = document.getElementById('yearSelect');
//     select.innerHTML = '<option value="">-- Выберите год --</option>';
//     years.sort().forEach(year => {
//         const option = document.createElement('option');
//         option.value = year;
//         option.textContent = year;
//         select.appendChild(option);
//     });

//     if (years.length === 0) {
//         alert("Не найдено годов в данных!");
//     }
// }

// function processData() {
//     const selectedYear = document.getElementById('yearSelect').value;
//     if (!selectedYear) {
//         alert('Выберите год!');
//         return;
//     }

//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = '';

//     // Агрегация данных по штатам
//     const stateData = {};
//     csvData.forEach(row => {
//         const date = row['order_date'];
//         if (!date) return;
//         const year = date.split('-')[0];
//         if (year === selectedYear) {
//             const state = row['state'];
//             const sales = parseFloat(row['sales']) || 0;

//             if (!stateData[state]) {
//                 stateData[state] = { state, revenue: 0, orders: 0 };
//             }
//             stateData[state].revenue += sales;
//             stateData[state].orders += 1; // +1 заказ на каждую строку
//         }
//     });

//     // Сортировка и выбор топ-10
//     const sortedStates = Object.values(stateData)
//         .sort((a, b) => b.revenue - a.revenue)
//         .slice(0, 10);

//     if (sortedStates.length === 0) {
//         resultDiv.innerHTML = `<p>Нет данных за ${selectedYear} год.</p>`;
//         return;
//     }

//     // Создание таблицы
//     const table = document.createElement('table');
//     const thead = document.createElement('thead');
//     const tbody = document.createElement('tbody');

//     // Заголовок таблицы
//     const titleRow = document.createElement('tr');
//     titleRow.innerHTML = `<td colspan="4"><strong>Выручка по штатам за ${selectedYear} год (топ 10)</strong></td>`;
//     thead.appendChild(titleRow);

//     // Шапка таблицы
//     const headerRow = document.createElement('tr');
//     ['№', 'Штат', 'Заказы', 'Выручка'].forEach(text => {
//         const th = document.createElement('th');
//         th.textContent = text;
//         headerRow.appendChild(th);
//     });
//     thead.appendChild(headerRow);

//     // Данные таблицы
//     sortedStates.forEach((item, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${item.state}</td>
//             <td>${item.orders.toLocaleString()}</td>
//             <td>$${item.revenue.toFixed(2)}</td>
//         `;
//         tbody.appendChild(row);
//     });

//     table.appendChild(thead);
//     table.appendChild(tbody);
//     resultDiv.appendChild(table);
// }















let csvData = [];

document.getElementById('csvFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const text = event.target.result;
        csvData = parseCSV(text);
        console.log("Данные загружены:", csvData.length, "строк"); // Лог
        populateYearSelect();
    };
    reader.onerror = function () {
        alert("Ошибка чтения файла!");
    };
    reader.readAsText(file);
});

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
        alert("Файл пуст или имеет неправильный формат!");
        return [];
    }

    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim() || '';
            return obj;
        }, {});
    });
}

function populateYearSelect() {
    const years = [...new Set(csvData.map(row => {
        const date = row['order_date'];
        if (!date) return null; // Пропускаем пустые даты
        const yearMatch = date.match(/^\d{4}-\d{2}-\d{2}/); // Проверка формата YYYY-MM-DD
        if (!yearMatch) return null;
        return date.split('-')[0];
    }).filter(Boolean))]; // Удаляем null

    console.log("Годы из файла:", years); // Лог
    const select = document.getElementById('yearSelect');
    select.innerHTML = '<option value="">-- Выберите год --</option>';
    years.sort().forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });

    if (years.length === 0) {
        alert("Не найдено годов в данных!");
    }
}

function processData() {
    const selectedYear = document.getElementById('yearSelect').value;
    if (!selectedYear) {
        alert('Выберите год!');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Агрегация данных по штатам
    const stateData = {};
    let totalRevenue = 0;

    csvData.forEach(row => {
        const date = row['order_date'];
        if (!date) return;
        const year = date.split('-')[0];
        if (year === selectedYear) {
            const state = row['state'];
            const sales = parseFloat(row['sales']) || 0;

            totalRevenue += sales;

            if (!stateData[state]) {
                stateData[state] = { state, revenue: 0, orders: 0 };
            }
            stateData[state].revenue += sales;
            stateData[state].orders += 1; // +1 заказ на каждую строку
        }
    });

    // Сортировка и выбор топ-10
    const sortedStates = Object.values(stateData)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

    if (sortedStates.length === 0) {
        resultDiv.innerHTML = `<p>Нет данных за ${selectedYear} год.</p>`;
        return;
    }

    // Рассчёт доли топ-10
    const top10Revenue = sortedStates.reduce((sum, item) => sum + item.revenue, 0);
    const top10Share = totalRevenue ? (top10Revenue / totalRevenue * 100).toFixed(2) : 0;

    // Создание таблицы
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Заголовок таблицы
    const titleRow = document.createElement('tr');
    titleRow.innerHTML = `
        <td colspan="5">
            <strong>Выручка по штатам за ${selectedYear} год (топ 10)</strong><br>
            <em>Общая выручка: $${totalRevenue.toFixed(2)} | Доля топ-10: ${top10Share}%</em>
        </td>
    `;
    thead.appendChild(titleRow);

    // Шапка таблицы
    const headerRow = document.createElement('tr');
    ['№', 'Штат', 'Заказы', 'Выручка', 'Доля (%)'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Данные таблицы
    sortedStates.forEach((item, index) => {
        const share = totalRevenue ? ((item.revenue / totalRevenue) * 100).toFixed(2) : 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.state}</td>
            <td>${item.orders.toLocaleString()}</td>
            <td>$${item.revenue.toFixed(2)}</td>
            <td>${share}%</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultDiv.appendChild(table);
}
