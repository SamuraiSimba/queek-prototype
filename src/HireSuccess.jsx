import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ============================================================
// HIRE SUCCESS — Confirmation screen after Sarah hires Marcus
// Shows next steps, timeline, contact info
// ============================================================

const HireSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidate, contractValue, queekFee } = location.state || {};

  useEffect(() => {
    if (!candidate) {
      navigate("/employers/matches");
    }
  }, [candidate, navigate]);

  if (!candidate) return null;

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
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
        }}>
          Qu<span style={{ color: "#00D9FF" }}>ee</span>k
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "60px 24px",
        textAlign: "center",
      }}>
        {/* Success Icon */}
        <div style={{
          width: 80,
          height: 80,
          margin: "0 auto 32px",
          background: "linear-gradient(135deg, #00FFB3 0%, #00D9FF 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          animation: "scaleIn 0.5s ease",
        }}>
          ✓
        </div>

        <div style={{
          fontSize: 13,
          color: "#00FFB3",
          fontWeight: 600,
          letterSpacing: 1,
          marginBottom: 16,
        }}>
          HIRE CONFIRMED
        </div>

        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 16,
          lineHeight: 1.2,
        }}>
          {candidate.name} has been hired!
        </h2>

        <p style={{
          fontSize: 16,
          color: "#B8C5D6",
          marginBottom: 48,
          lineHeight: 1.6,
        }}>
          We've notified {candidate.name} and sent you both a contract confirmation email.
        </p>

        {/* What Happens Next */}
        <div style={{
          background: "#1E2447",
          border: "1px solid #2D3653",
          borderRadius: 12,
          padding: 24,
          textAlign: "left",
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 13,
            color: "#00D9FF",
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 20,
          }}>
            WHAT HAPPENS NEXT
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
            {[
              {
                step: "1",
                title: "Contract Signing",
                desc: "Both parties sign the digital contract (sent via email within 1 hour)",
                time: "Today",
              },
              {
                step: "2",
                title: "Background Check",
                desc: `${candidate.name}'s verification completes (already in progress)`,
                time: "24-48 hours",
              },
              {
                step: "3",
                title: "Start Work",
                desc: `${candidate.name} begins on agreed start date`,
                time: "As scheduled",
              },
              {
                step: "4",
                title: "First Invoice",
                desc: "Queek sends invoice after first completed work period",
                time: "After Week 1",
              },
            ].map((item) => (
              <div key={item.step} style={{
                display: "flex",
                gap: 16,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  background: "#00D9FF22",
                  border: "1px solid #00D9FF44",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#00D9FF",
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: "#B8C5D6",
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "#6B7A99",
                  }}>
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div style={{
          background: "#1E2447",
          border: "1px solid #2D3653",
          borderRadius: 12,
          padding: 20,
          textAlign: "left",
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 13,
            color: "#6B7A99",
            marginBottom: 12,
          }}>
            PAYMENT SUMMARY
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 14, color: "#B8C5D6" }}>Contract Value</span>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
              ${contractValue?.toLocaleString() || "0"}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 12,
            borderBottom: "1px solid #2D3653",
          }}>
            <span style={{ fontSize: 14, color: "#B8C5D6" }}>Queek Fee</span>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
              ${queekFee?.toLocaleString() || "0"}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 12,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
            <span style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#00D9FF",
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              ${((contractValue || 0) + (queekFee || 0)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Support */}
        <div style={{
          background: "#00D9FF11",
          border: "1px solid #00D9FF33",
          borderRadius: 10,
          padding: 16,
          marginBottom: 32,
          fontSize: 14,
          color: "#B8C5D6",
          textAlign: "center",
        }}>
          Questions? Email us at{" "}
          <a href="mailto:hello@queek.ca" style={{ color: "#00D9FF", textDecoration: "none", fontWeight: 600 }}>
            hello@queek.ca
          </a>
          <br />
          or text 587-XXX-XXXX
        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <button
            onClick={() => navigate("/employers/matches")}
            style={{
              padding: "16px",
              background: "#00D9FF",
              border: "none",
              borderRadius: 10,
              color: "#0A0E27",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            View Other Matches
          </button>
          <button
            onClick={() => navigate("/employers/post-job")}
            style={{
              padding: "16px",
              background: "transparent",
              border: "1px solid #2D3653",
              borderRadius: 10,
              color: "#B8C5D6",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Post Another Role
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HireSuccess;