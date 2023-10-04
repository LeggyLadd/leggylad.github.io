        const graphConfigurations = [];
        let xValues = [];
        const removeGraphSelect = document.getElementById('removeGraphSelect');

        function updateChart() {
            const chartData = [];
            xValues = [];
            removeGraphSelect.innerHTML = '';

            graphConfigurations.forEach((config, index) => {
                const { A, B, C, D, xMin, xMax, step, name } = config;

                for (let x = xMin; x <= xMax; x += step) {
                    xValues.push(x);
                }

                const yValues = xValues.map(x => A * Math.sin(B * x + C) + D);
                chartData.push({ name, data: yValues });

                const option = document.createElement('option');
                option.value = index;
                option.text = name || `Graph ${index + 1}`;
                removeGraphSelect.appendChild(option);
            });

            Highcharts.chart('plotContainer', {
                title: {
                    text: 'Multiple Sine Wave Graphs'
                },
                xAxis: {
                    title: {
                        text: 'X'
                    },
                    categories: xValues
                },
                yAxis: {
                    title: {
                        text: 'Y'
                    }
                },
                series: chartData
            });
        }

        document.getElementById('addGraphButton').addEventListener('click', function () {
            const A = parseFloat(document.getElementById('inputA').value);
            const B = parseFloat(document.getElementById('inputB').value);
            const C = parseFloat(document.getElementById('inputC').value);
            const D = parseFloat(document.getElementById('inputD').value);
            const xMin = parseFloat(document.getElementById('inputXMin').value);
            const xMax = parseFloat(document.getElementById('inputXMax').value);
            const step = parseFloat(document.getElementById('inputStep').value);
            const name = document.getElementById('graphName').value;

            graphConfigurations.push({ A, B, C, D, xMin, xMax, step, name });
            updateChart();
        });

        document.getElementById('removeGraphButton').addEventListener('click', function () {
            const selectedIndex = removeGraphSelect.selectedIndex;
            if (selectedIndex >= 0) {
                graphConfigurations.splice(selectedIndex, 1);
                updateChart();
            }
        });

        updateChart();