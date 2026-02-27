import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// JOB POSTING FLOW — Conversational, chatbot-style
// Sarah posts her role in 90 seconds through guided conversation
// ============================================================

const ROLE_OPTIONS = [
  { id: "tester", label: "Software Tester", icon: "💻", skills: ["Test Automation", "Selenium", "API Testing", "Manual Testing"] },
  { id: "security", label: "Cybersecurity Analyst", icon: "🔐", skills: ["Security Audits", "Penetration Testing", "SIEM", "Compliance"] },
  { id: "support", label: "IT Support", icon: "🛠️", skills: ["Help Desk", "Troubleshooting", "Windows/Mac", "Active Directory"] },
  { id: "grc", label: "GRC Compliance", icon: "📋", skills: ["Risk Assessment", "Policy Development", "Audit Management", "ISO 27001"] },
  { id: "other", label: "Other Tech Role", icon: "⚡", skills: [] },
];

const JobPosting = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  
  const [formData, setFormData] = useState({
    role: null,
    skills: [],
    rate: 45,
    startDate: "",
    location: "",
    duration: "",
  });

  const selectedRole = ROLE_OPTIONS.find(r => r.id === formData.role);

  // Navigate to next step
  const goNext = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(s => s + 1);
  };

  const goBack = () => setStep(s => Math.max(0, s - 1));

  const handlePost = () => {
    // Store job posting and navigate to matches
    localStorage.setItem("jobPosting", JSON.stringify(formData));
    navigate("/employers/matches");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E27",
      color: "#E8EAF6",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
      display: "flex",
      flexDirection: "column",
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
        {step > 0 ? (
          <button
            onClick={goBack}
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
        ) : <div style={{ width: 24 }} />}

        <div style={{
          fontSize: 18,
          fontWeight: 700,
        }}>
          Qu<span style={{ color: "#00D9FF" }}>ee</span>k
        </div>

        <div style={{ width: 24 }} />
      </div>

      {/* Progress */}
      <div style={{
        padding: "16px 24px",
        display: "flex",
        gap: 6,
        justifyContent: "center",
      }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              width: i === step ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i <= step ? "#00D9FF" : "#1E2447",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        maxWidth: 600,
        margin: "0 auto",
        padding: "24px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        
        {/* Step 0: Role Type */}
        {step === 0 && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 1 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              What kind of role are you hiring for?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Pick the one that's closest. We'll refine the details next.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}>
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role.id}
                  onClick={() => goNext("role", role.id)}
                  style={{
                    padding: "20px 16px",
                    background: "#1E2447",
                    border: "1px solid #2D3653",
                    borderRadius: 12,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#00D9FF";
                    e.currentTarget.style.background = "#1E244755";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#2D3653";
                    e.currentTarget.style.background = "#1E2447";
                  }}
                >
                  <span style={{ fontSize: 32 }}>{role.icon}</span>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#E8EAF6",
                    textAlign: "center",
                  }}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Skills */}
        {step === 1 && selectedRole && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 2 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              What specific skills do they need?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Select all that apply. We'll only match candidates who have these verified.
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 32,
            }}>
              {selectedRole.skills.map((skill) => {
                const isSelected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        skills: isSelected
                          ? prev.skills.filter(s => s !== skill)
                          : [...prev.skills, skill]
                      }));
                    }}
                    style={{
                      padding: "10px 16px",
                      background: isSelected ? "#00D9FF" : "#1E2447",
                      border: `1px solid ${isSelected ? "#00D9FF" : "#2D3653"}`,
                      borderRadius: 8,
                      color: isSelected ? "#0A0E27" : "#E8EAF6",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goNext("skills", formData.skills)}
              disabled={formData.skills.length === 0}
              style={{
                width: "100%",
                padding: "16px",
                background: formData.skills.length > 0 ? "#00D9FF" : "#2D3653",
                border: "none",
                borderRadius: 8,
                color: formData.skills.length > 0 ? "#0A0E27" : "#6B7A99",
                fontSize: 16,
                fontWeight: 700,
                cursor: formData.skills.length > 0 ? "pointer" : "not-allowed",
              }}
            >
              Continue ({formData.skills.length} selected) →
            </button>
          </div>
        )}

        {/* Step 2: Rate */}
        {step === 2 && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 3 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              What's your hourly budget?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              We'll only show you candidates whose minimum rate is at or below this.
            </p>

            <div style={{
              textAlign: "center",
              marginBottom: 24,
            }}>
              <div style={{
                fontSize: 56,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                color: "#00D9FF",
                marginBottom: 8,
              }}>
                ${formData.rate}<span style={{ fontSize: 24, color: "#6B7A99" }}>/hr</span>
              </div>
              <div style={{
                fontSize: 13,
                color: "#B8C5D6",
              }}>
                {selectedRole.label}s in Edmonton typically earn $40-65/hr
              </div>
            </div>

            <input
              type="range"
              min={15}
              max={150}
              step={5}
              value={formData.rate}
              onChange={(e) => setFormData(prev => ({ ...prev, rate: Number(e.target.value) }))}
              style={{
                width: "100%",
                marginBottom: 8,
                accentColor: "#00D9FF",
                height: 6,
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#6B7A99",
              marginBottom: 32,
            }}>
              <span>$15/hr</span>
              <span>$150/hr</span>
            </div>

            <div style={{
              padding: 16,
              background: "#1E2447",
              borderRadius: 8,
              marginBottom: 32,
              fontSize: 13,
              color: "#B8C5D6",
            }}>
              💡 For a 3-month contract: ${formData.rate}/hr × 40hrs/week × 12 weeks = <strong style={{ color: "#00FFB3" }}>${(formData.rate * 40 * 12).toLocaleString()}</strong>
            </div>

            <button
              onClick={() => goNext("rate", formData.rate)}
              style={{
                width: "100%",
                padding: "16px",
                background: "#00D9FF",
                border: "none",
                borderRadius: 8,
                color: "#0A0E27",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3: Start Date */}
        {step === 3 && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 4 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              When do you need them to start?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              This helps us prioritize candidates by availability.
            </p>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {["ASAP (this week)", "Next week", "Within 2 weeks", "Within a month"].map((option) => (
                <button
                  key={option}
                  onClick={() => goNext("startDate", option)}
                  style={{
                    padding: "18px 20px",
                    background: "#1E2447",
                    border: "1px solid #2D3653",
                    borderRadius: 10,
                    color: "#E8EAF6",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#00D9FF";
                    e.currentTarget.style.background = "#1E244755";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#2D3653";
                    e.currentTarget.style.background = "#1E2447";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 5 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              Where will they work?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Select the work arrangement for this role.
            </p>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {[
                { value: "remote", label: "Fully Remote", desc: "Work from anywhere in Canada" },
                { value: "hybrid", label: "Hybrid", desc: "Mix of remote and in-office (Edmonton)" },
                { value: "onsite", label: "On-site", desc: "Must work from Edmonton office" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => goNext("location", option.value)}
                  style={{
                    padding: "18px 20px",
                    background: "#1E2447",
                    border: "1px solid #2D3653",
                    borderRadius: 10,
                    color: "#E8EAF6",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#00D9FF";
                    e.currentTarget.style.background = "#1E244755";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#2D3653";
                    e.currentTarget.style.background = "#1E2447";
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#B8C5D6" }}>
                    {option.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Duration */}
        {step === 5 && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              STEP 6 OF 6
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}>
              How long do you need them?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              marginBottom: 32,
              lineHeight: 1.6,
            }}>
              Contract length helps candidates decide if it fits their plans.
            </p>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {["3 months", "6 months", "1 year", "Ongoing / Permanent"].map((option) => (
                <button
                  key={option}
                  onClick={() => goNext("duration", option)}
                  style={{
                    padding: "18px 20px",
                    background: "#1E2447",
                    border: "1px solid #2D3653",
                    borderRadius: 10,
                    color: "#E8EAF6",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#00D9FF";
                    e.currentTarget.style.background = "#1E244755";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#2D3653";
                    e.currentTarget.style.background = "#1E2447";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Review */}
        {step === 6 && selectedRole && (
          <div style={{
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{
              fontSize: 13,
              color: "#00FFB3",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 16,
            }}>
              REVIEW & POST
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 32,
              lineHeight: 1.2,
            }}>
              Here's your role
            </h2>

            <div style={{
              background: "#1E2447",
              border: "1px solid #2D3653",
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Role</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{selectedRole.label}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Required Skills</div>
                  <div style={{ fontSize: 14 }}>{formData.skills.join(", ")}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Budget</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#00FFB3" }}>${formData.rate}/hr</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Start Date</div>
                  <div style={{ fontSize: 14 }}>{formData.startDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Location</div>
                  <div style={{ fontSize: 14 }}>{formData.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>Duration</div>
                  <div style={{ fontSize: 14 }}>{formData.duration}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePost}
              style={{
                width: "100%",
                padding: "18px",
                background: "#00D9FF",
                border: "none",
                borderRadius: 10,
                color: "#0A0E27",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Post This Role & See Matches →
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default JobPosting;
