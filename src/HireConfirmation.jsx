import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "./firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

// ============================================================
// HIRE CONFIRMATION — Sarah reviews pricing and confirms hire
// Shows contract breakdown, Queek fee, total cost
// ============================================================

const HireConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidate, jobPosting } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (!candidate || !jobPosting) {
      navigate("/employers/matches");
    }
  }, [candidate, jobPosting, navigate]);

  if (!candidate || !jobPosting) return null;

  // Calculate pricing
  const hourlyRate = candidate.rate;
  const hoursPerWeek = 40;
  const weeksMap = {
    "3 months": 12,
    "6 months": 24,
    "1 year": 52,
    "Ongoing / Permanent": 52, // Default to 1 year for calculation
  };
  const weeks = weeksMap[jobPosting.duration] || 12;
  
  const contractValue = hourlyRate * hoursPerWeek * weeks;
  const queekFeePercent = 15;
  const queekFee = contractValue * (queekFeePercent / 100);
  const isFirstHire = true; // TODO: Check if this is first hire from DB
  const discount = isFirstHire ? queekFee * 0.5 : 0;
  const finalQueekFee = queekFee - discount;
  const totalCost = contractValue + finalQueekFee;

  const handleConfirmHire = async () => {
    setIsProcessing(true);

    try {
      // Create hire record in Firebase
      const employer = JSON.parse(localStorage.getItem("employer") || "{}");
      
      await addDoc(collection(db, "hires"), {
        candidateId: candidate.id,
        candidateName: candidate.name,
        employerEmail: employer.email,
        employerCompany: employer.company,
        jobPosting: jobPosting,
        contractValue: contractValue,
        queekFee: finalQueekFee,
        totalCost: totalCost,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });

      // Update candidate status
      // Note: In production, you'd also send notifications, emails, etc.

      // Show success and redirect
      setTimeout(() => {
        navigate("/employers/hire-success", {
          state: { candidate, contractValue, queekFee: finalQueekFee }
        });
      }, 1500);

    } catch (error) {
      console.error("Error confirming hire:", error);
      alert("Error processing hire. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E27",
      color: "#E8EAF6",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid #1E2447",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#6B7A99",
            fontSize: 24,
            cursor: "pointer",
            padding: 0,
          }}
        >
          ←
        </button>

        <div style={{
          fontSize: 18,
          fontWeight: 700,
        }}>
          Qu<span style={{ color: "#00D9FF" }}>ee</span>k
        </div>

        <div style={{ width: 24 }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "32px 24px",
      }}>
        <div style={{
          fontSize: 13,
          color: "#00D9FF",
          fontWeight: 600,
          letterSpacing: 1,
          marginBottom: 16,
        }}>
          CONFIRM HIRE
        </div>

        <h2 style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          You're about to hire {candidate.name}
        </h2>

        <p style={{
          fontSize: 15,
          color: "#B8C5D6",
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Review the contract details and pricing below.
        </p>

        {/* Candidate Summary */}
        <div style={{
          background: "#1E2447",
          border: "1px solid #2D3653",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 12,
            color: "#6B7A99",
            marginBottom: 12,
          }}>
            CANDIDATE
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                {candidate.name}
              </div>
              <div style={{ fontSize: 14, color: "#B8C5D6" }}>
                {Array.isArray(candidate.skills) ? candidate.skills.join(", ") : ""}
              </div>
            </div>
            <div style={{
              padding: "6px 12px",
              background: "#00FFB311",
              border: "1px solid #00FFB333",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              color: "#00FFB3",
            }}>
              {candidate.matchScore}% match
            </div>
          </div>
        </div>

        {/* Contract Details */}
        <div style={{
          background: "#1E2447",
          border: "1px solid #2D3653",
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 12,
            color: "#6B7A99",
            marginBottom: 16,
          }}>
            CONTRACT DETAILS
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: "1px solid #2D3653",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "#B8C5D6" }}>Hourly Rate</span>
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                ${hourlyRate}/hr
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "#B8C5D6" }}>Hours per Week</span>
              <span style={{ fontWeight: 600 }}>{hoursPerWeek} hrs</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "#B8C5D6" }}>Duration</span>
              <span style={{ fontWeight: 600 }}>{jobPosting.duration} ({weeks} weeks)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "#B8C5D6" }}>Start Date</span>
              <span style={{ fontWeight: 600 }}>{jobPosting.startDate}</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
              <span style={{ color: "#B8C5D6" }}>Contract Value</span>
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                ${contractValue.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
              <span style={{ color: "#B8C5D6" }}>Queek Fee (15%)</span>
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                ${queekFee.toLocaleString()}
              </span>
            </div>
            {isFirstHire && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
                color: "#00FFB3",
              }}>
                <span>🎉 First Hire Discount (50%)</span>
                <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                  -${discount.toLocaleString()}
                </span>
              </div>
            )}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 700,
              paddingTop: 12,
              borderTop: "1px solid #2D3653",
            }}>
              <span>Total Cost</span>
              <span style={{ color: "#00D9FF", fontFamily: "'JetBrains Mono', monospace" }}>
                ${totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{
          background: "#00D9FF11",
          border: "1px solid #00D9FF33",
          borderRadius: 10,
          padding: 16,
          marginBottom: 24,
          fontSize: 14,
          color: "#B8C5D6",
          lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 700, color: "#00D9FF", marginBottom: 8 }}>
            ✓ 30-Day Quality Guarantee
          </div>
          If the hire doesn't work out within 30 days, we'll replace them for free or refund your Queek fee.
        </div>

        {/* Terms Checkbox */}
        <label style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 24,
          cursor: "pointer",
        }}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            style={{
              marginTop: 4,
              width: 18,
              height: 18,
              accentColor: "#00D9FF",
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: 14, color: "#B8C5D6", lineHeight: 1.6 }}>
            I agree to Queek's{" "}
            <a href="#" style={{ color: "#00D9FF", textDecoration: "none" }}>
              Terms of Service
            </a>{" "}
            and confirm the contract details above.
          </span>
        </label>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmHire}
          disabled={!agreedToTerms || isProcessing}
          style={{
            width: "100%",
            padding: "18px",
            background: agreedToTerms && !isProcessing ? "#00D9FF" : "#2D3653",
            border: "none",
            borderRadius: 10,
            color: agreedToTerms && !isProcessing ? "#0A0E27" : "#6B7A99",
            fontSize: 16,
            fontWeight: 700,
            cursor: agreedToTerms && !isProcessing ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {isProcessing ? "Processing..." : `Confirm Hire — $${totalCost.toLocaleString()}`}
        </button>

        <p style={{
          fontSize: 12,
          color: "#6B7A99",
          textAlign: "center",
          marginTop: 16,
        }}>
          You'll receive an invoice and contract via email.
        </p>
      </div>
    </div>
  );
};

export default HireConfirmation;