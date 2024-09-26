'use client';

import React, { useState } from 'react';

export default function Page() {
  const [loanAmount, setLoanAmount] = useState<string>(''); 
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTenure, setLoanTenure] = useState<string>('');
  const [emi, setEmi] = useState<number | null>(null); 

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const rate = Number(interestRate);
    const tenure = Number(loanTenure);

    if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate <= 0 || tenure <= 0) {
      alert("Please enter valid numbers greater than zero");
      return;
    }

    const r = rate / (12 * 100); 
    const n = tenure * 12; 
    const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Number(emiValue.toFixed(2))); 
  };

  return (
    <main>
      {/* <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1> */}
      
      <div>
        <h2 className="mb-4 text-lg">EMI Calculator</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Loan Amount:</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Annual Interest Rate (%):</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Loan Tenure (Years):</label>
            <input
              type="text"
              className="p-2 border rounded w-full"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="Enter loan tenure"
            />
          </div>

          <button
            className="px-4 py-2 bg-sky-950 text-white rounded"
            onClick={calculateEMI}
          >
            Calculate EMI
          </button>

          {emi !== null && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Monthly EMI: ₹{emi}</h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
