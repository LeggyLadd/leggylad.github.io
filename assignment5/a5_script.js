  const spirographs = [];
      const spirographSelect = document.getElementById('spirographSelect');
      const canvas = document.getElementById('spirographCanvas');
      const ctx = canvas.getContext('2d');
      const editModal = document.getElementById('editModal');
      const editButton = document.getElementById('editButton');
      const error = document.getElementById('error');

      function startSpirograph() {
        const outerRadius = parseFloat(document.getElementById('outerRadius').value);
        const innerRadius = parseFloat(document.getElementById('innerRadius').value);
        const penOffset = parseFloat(document.getElementById('penOffset').value);

        const spirograph = {
          outerRadius,
          innerRadius,
          penOffset,
          color: getRandomColor(),
        };

        spirographs.push(spirograph);
        drawSpirograph(spirograph);

        // Add to the dropdown menu
        const option = document.createElement('option');
        option.value = spirographs.length - 1;
        option.textContent = `Spirograph ${spirographs.length}`;
        spirographSelect.appendChild(option);
      }

      function drawSpirograph(spirograph) {
        const increment = 0.01;
        let t = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = spirograph.color;

        while (t < 100) { // You can adjust the number of cycles
          const x = (spirograph.outerRadius + spirograph.innerRadius) * Math.cos(t) - (spirograph.innerRadius + spirograph.penOffset) * Math.cos(((spirograph.outerRadius + spirograph.innerRadius) / spirograph.innerRadius) * t);
          const y = (spirograph.outerRadius + spirograph.innerRadius) * Math.sin(t) - (spirograph.innerRadius + spirograph.penOffset) * Math.sin(((spirograph.outerRadius + spirograph.innerRadius) / spirograph.innerRadius) * t);

          const canvasX = canvas.width / 2 + x;
          const canvasY = canvas.height / 2 + y;

          ctx.lineTo(canvasX, canvasY);
          t += increment;
        }

        ctx.stroke();
      }

      function selectSpirograph() {
        const selectedIndex = spirographSelect.value;
        if (selectedIndex !== '-1') {
          editButton.disabled = false;
          openEditModal();
          populateEditModal(spirographs[selectedIndex]);
          error.style.display = 'none';
        } else {
          editButton.disabled = true;
          error.style.display = 'block';
        }
      }

      function openEditModal() {
        editModal.style.display = 'block';
      }

      function populateEditModal(spirograph) {
        document.getElementById('editOuterRadius').value = spirograph.outerRadius;
        document.getElementById('editInnerRadius').value = spirograph.innerRadius;
        document.getElementById('editPenOffset').value = spirograph.penOffset;
        document.getElementById('editSpirographColor').value = spirograph.color;
      }

      function saveEdit() {
        const selectedIndex = spirographSelect.value;
        if (selectedIndex !== '-1') {
          const spirograph = spirographs[selectedIndex];
          spirograph.outerRadius = parseFloat(document.getElementById('editOuterRadius').value);
          spirograph.innerRadius = parseFloat(document.getElementById('editInnerRadius').value);
          spirograph.penOffset = parseFloat(document.getElementById('editPenOffset').value);
          spirograph.color = document.getElementById('editSpirographColor').value;

          drawSpirograph(spirograph);
        }

        editModal.style.display = 'none';
      }

      function cancelEdit() {
        editModal.style.display = 'none';
      }

      function deleteSpirograph() {
        const selectedIndex = spirographSelect.value;
        if (selectedIndex !== '-1') {
          spirographs.splice(selectedIndex, 1);
          spirographSelect.remove(selectedIndex);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          editModal.style.display = 'none';
        }
      }

      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }