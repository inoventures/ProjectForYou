<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Transaction Reporting Form</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }

    body {
      font-family: 'Roboto', sans-serif;
      background-color: #f1f3f4;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
    }

    .form-container {
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 25px;
      max-width: 500px;
      width: 100%;
    }

    h2 {
      text-align: center;
      color: #202124;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-top: 15px;
      font-weight: 500;
      color: #3c4043;
    }

    .required::after {
      content: " *";
      color: red;
    }

    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 6px;
      border: 1px solid #dadce0;
      border-radius: 8px;
      font-size: 14px;
      background-color: #f8f9fa;
      color: #202124;
    }

    input::placeholder {
      color: #9e9e9e;
    }

    input[readonly] {
      background-color: #f1f3f4;
      color: #5f6368;
      cursor: not-allowed;
    }

    .row {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .row .column {
      flex: 1;
    }

    button {
      margin-top: 25px;
      width: 100%;
      padding: 12px;
      background-color: #673ab7;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:hover:enabled {
      background-color: #5e35b1;
    }

    @media (max-width: 600px) {
      .row {
        flex-direction: column;
        gap: 0px;
      }
    }
  </style>
</head>
<body>

<div class="form-container">
  <h2>Transaction Reporting Form</h2>
  <form id="approvalForm">
    <label for="transactionId">Transaction ID</label>
    <input type="text" id="transactionId" value="67678678" readonly>

    <label for="date" class="required">Date of Transaction</label>
    <input type="date" id="date" placeholder="Select date">

    <label for="time" class="required">Time of Transaction</label>
    <input type="time" id="time" placeholder="Select time">

    <div class="row">
      <div class="column">
        <label for="payer" class="required">Payer</label>
        <select id="payer">
          <option value="">Select payer</option>
          <option value="Sahithi Niharika">Sahithi Niharika</option>
          <option value="Shubham Dwivedi">Shubham Dwivedi</option>
        </select>
      </div>
      <div class="column">
        <label for="payee" class="required">Payee</label>
        <select id="payee">
          <option value="">Select payee</option>
          <option value="Sahithi Niharika">Sahithi Niharika</option>
          <option value="Shubham Dwivedi">Shubham Dwivedi</option>
        </select>
      </div>
    </div>

    <label for="amount" class="required">Amount of Transaction (₹)</label>
    <input type="number" id="amount" placeholder="Enter amount">

    <label for="receipt">Upload Receipt</label>
    <input type="file" id="receipt" accept=".jpg,.jpeg,.png,.pdf">

    <button type="submit" id="submitBtn" disabled>Submit for Review</button>
  </form>
</div>

<script>
  const form = document.getElementById('approvalForm');
  const submitBtn = document.getElementById('submitBtn');
  const payer = document.getElementById('payer');
  const payee = document.getElementById('payee');

  function validateForm() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const payerVal = payer.value;
    const payeeVal = payee.value;
    const amount = document.getElementById('amount').value;

    const isValid = date && time && payerVal && payeeVal && amount;
    submitBtn.disabled = !isValid;
  }

  function updatePayeeOptions() {
    const selectedPayer = payer.value;
    [...payee.options].forEach(option => {
      option.disabled = option.value === selectedPayer;
    });
    if (payee.value === selectedPayer) {
      payee.value = "";
    }
    validateForm();
  }

  form.addEventListener('input', validateForm);
  payer.addEventListener('change', updatePayeeOptions);
</script>

</body>
</html>
