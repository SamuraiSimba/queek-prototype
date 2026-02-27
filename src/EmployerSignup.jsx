import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// EMPLOYER SIGNUP — Get Sarah in the door fast
// Goal: Email → Name → Company → Post first job
// ============================================================

const EmployerSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleEmailSubmit = () => {
    if (email.includes("@")) {
      setStep(1);
    }
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setStep(2);
    }
  };

 const handleCompanySubmit = async () => {
  if (company.trim()) {
    // Save employer to Firebase
    const { db } = await import('./firebase');
    const { collection, addDoc } = await import('firebase/firestore');
    
    const employerData = {
      email,
      name,
      company,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    
    const docRef = await addDoc(collection(db, 'employers'), employerData);
    
    // Save employer ID to localStorage for session
    localStorage.setItem("employerId", docRef.id);
    localStorage.setItem("employer", JSON.stringify(employerData));
    
    navigate("/employers/post-job");
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E27",
      color: "#E8EAF6",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div style={{
        maxWidth: 480,
        width: "100%",
      }}>
        {/* Logo */}
        <div style={{
          textAlign: "center",
          marginBottom: 48,
        }}>
          <div style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 8,
          }}>
            Qu<span style={{ color: "#00D9FF" }}>ee</span>k
          </div>
          <div style={{
            fontSize: 13,
            color: "#6B7A99",
            fontWeight: 500,
            letterSpacing: 1,
          }}>
            FOR EMPLOYERS
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 40,
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === step ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i <= step ? "#00D9FF" : "#1E2447",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Step 0: Email */}
        {step === 0 && (
          <div style={{
            background: "#1E2447",
            border: "1px solid #2D3653",
            borderRadius: 16,
            padding: "40px 32px",
          }}>
            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
              color: "#E8EAF6",
            }}>
              Let's get you started
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Enter your work email to create your account.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#B8C5D6",
                marginBottom: 8,
              }}>
                Work email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                placeholder="sarah@company.com"
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "#0A0E27",
                  border: "1px solid #2D3653",
                  borderRadius: 8,
                  color: "#E8EAF6",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#00D9FF"}
                onBlur={(e) => e.target.style.borderColor = "#2D3653"}
              />
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={!email.includes("@")}
              style={{
                width: "100%",
                padding: "14px",
                background: email.includes("@") ? "#00D9FF" : "#2D3653",
                border: "none",
                borderRadius: 8,
                color: email.includes("@") ? "#0A0E27" : "#6B7A99",
                fontSize: 16,
                fontWeight: 700,
                cursor: email.includes("@") ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              Continue →
            </button>

            <p style={{
              fontSize: 12,
              color: "#6B7A99",
              marginTop: 16,
              textAlign: "center",
            }}>
              Free to start. Pay only when you hire.
            </p>
          </div>
        )}

        {/* Step 1: Name */}
        {step === 1 && (
          <div style={{
            background: "#1E2447",
            border: "1px solid #2D3653",
            borderRadius: 16,
            padding: "40px 32px",
          }}>
            <button
              onClick={() => setStep(0)}
              style={{
                background: "none",
                border: "none",
                color: "#6B7A99",
                fontSize: 14,
                cursor: "pointer",
                marginBottom: 24,
                padding: 0,
              }}
            >
              ← Back
            </button>

            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
              color: "#E8EAF6",
            }}>
              What should we call you?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Just your first name is fine.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#B8C5D6",
                marginBottom: 8,
              }}>
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Sarah"
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "#0A0E27",
                  border: "1px solid #2D3653",
                  borderRadius: 8,
                  color: "#E8EAF6",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#00D9FF"}
                onBlur={(e) => e.target.style.borderColor = "#2D3653"}
              />
            </div>

            <button
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              style={{
                width: "100%",
                padding: "14px",
                background: name.trim() ? "#00D9FF" : "#2D3653",
                border: "none",
                borderRadius: 8,
                color: name.trim() ? "#0A0E27" : "#6B7A99",
                fontSize: 16,
                fontWeight: 700,
                cursor: name.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Company */}
        {step === 2 && (
          <div style={{
            background: "#1E2447",
            border: "1px solid #2D3653",
            borderRadius: 16,
            padding: "40px 32px",
          }}>
            <button
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: "#6B7A99",
                fontSize: 14,
                cursor: "pointer",
                marginBottom: 24,
                padding: 0,
              }}
            >
              ← Back
            </button>

            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
              color: "#E8EAF6",
            }}>
              Almost there, {name}
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              What company are you hiring for?
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#B8C5D6",
                marginBottom: 8,
              }}>
                Company name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCompanySubmit()}
                placeholder="e.g. Jobber, AltaML, or your company name"
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "#0A0E27",
                  border: "1px solid #2D3653",
                  borderRadius: 8,
                  color: "#E8EAF6",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#00D9FF"}
                onBlur={(e) => e.target.style.borderColor = "#2D3653"}
              />
            </div>

            <button
              onClick={handleCompanySubmit}
              disabled={!company.trim()}
              style={{
                width: "100%",
                padding: "14px",
                background: company.trim() ? "#00D9FF" : "#2D3653",
                border: "none",
                borderRadius: 8,
                color: company.trim() ? "#0A0E27" : "#6B7A99",
                fontSize: 16,
                fontWeight: 700,
                cursor: company.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              Create account & post first role →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerSignup;