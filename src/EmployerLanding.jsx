import { useNavigate } from 'react-router-dom';
import { useState } from "react";

// ============================================================
// QUEEK EMPLOYER LANDING PAGE
// Target: Sarah Chen (Engineering Manager, 50-200 employee tech company)
// Goal: Answer 4 questions in 60 seconds → Get her to click "Post Your First Role"
// NOW MOBILE-FIRST to match candidate side
// ============================================================

const EmployerLanding = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/employers/signup');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E27",
      color: "#E8EAF6",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* HEADER */}
      <header style={{
        padding: "20px 24px",
        borderBottom: "1px solid #1E2447",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "#0A0E27dd",
        backdropFilter: "blur(8px)",
        zIndex: 100,
      }}>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}>
          Qu<span style={{ color: "#00D9FF" }}>ee</span>k
          <span style={{
            marginLeft: 8,
            fontSize: 10,
            color: "#6B7A99",
            fontWeight: 500,
            letterSpacing: 1,
            display: "block",
          }}>
            FOR EMPLOYERS
          </span>
        </div>
        <button style={{
          padding: "8px 16px",
          background: "#00D9FF",
          border: "none",
          borderRadius: 6,
          color: "#0A0E27",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
        }}>
          Sign In
        </button>
      </header>

      {/* HERO SECTION */}
      <section style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "60px 24px 48px",
        textAlign: "center",
      }}>
        {/* Social proof badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          background: "#1E244711",
          border: "1px solid #1E2447",
          borderRadius: 30,
          marginBottom: 24,
          fontSize: 12,
          color: "#00D9FF",
          fontWeight: 500,
        }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          Piloting with 3 Edmonton tech companies
        </div>

        {/* Main headline */}
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 20,
          letterSpacing: -1,
        }}>
          Hire verified Edmonton<br />
          tech contractors in{" "}
          <span style={{
            background: "linear-gradient(135deg, #00D9FF 0%, #00FFB3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            48 hours
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontSize: 16,
          color: "#B8C5D6",
          lineHeight: 1.6,
          marginBottom: 32,
          fontWeight: 400,
        }}>
          Not 3 weeks. Not 47 unqualified resumes.
          <br />
          Just instant interviews with skill-verified candidates.
        </p>

        {/* CTA */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 12,
        }}>
          <input
            type="email"
            placeholder="your@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
            style={{
              padding: "16px 20px",
              width: "100%",
              background: "#1E2447",
              border: "1px solid #2D3653",
              borderRadius: 8,
              color: "#E8EAF6",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleGetStarted}
            style={{
              padding: "16px 32px",
              background: "#00D9FF",
              border: "none",
              borderRadius: 8,
              color: "#0A0E27",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Post Your First Role →
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#6B7A99" }}>
          Free to post. Pay only when you hire. 50% off your first hire.
        </p>
      </section>

      {/* COMPARISON SECTION */}
      <section style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 24px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {/* Traditional way */}
          <div style={{
            padding: 28,
            background: "#1E244711",
            border: "1px solid #1E2447",
            borderRadius: 12,
          }}>
            <div style={{
              fontSize: 11,
              color: "#FF6B6B",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 12,
            }}>
              TRADITIONAL HIRING
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
              3 weeks
              <span style={{ fontSize: 16, color: "#6B7A99", fontWeight: 400 }}>
                {" "}minimum
              </span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {[
                "Post job → Wait 3-5 days for applications",
                "Screen 47 resumes (mostly unqualified)",
                "Schedule 5 interviews over 2 weeks",
                "Make offer → Wait for acceptance",
                "Finally start work",
              ].map((step, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 10,
                  fontSize: 14,
                  color: "#B8C5D6",
                }}>
                  <span style={{ color: "#FF6B6B", fontWeight: 600 }}>✕</span>
                  {step}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24,
              padding: 14,
              background: "#1E2447",
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
            }}>
              <div style={{ color: "#6B7A99", marginBottom: 6 }}>Cost</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                20-25%{" "}
                <span style={{ fontSize: 13, color: "#6B7A99" }}>agency fee</span>
              </div>
            </div>
          </div>

          {/* Queek way */}
          <div style={{
            padding: 28,
            background: "linear-gradient(135deg, #00D9FF11 0%, #00FFB311 100%)",
            border: "1px solid #00D9FF33",
            borderRadius: 12,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "6px 12px",
              background: "#00D9FF",
              color: "#0A0E27",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              borderRadius: "0 12px 0 12px",
            }}>
              QUEEK
            </div>
            <div style={{
              fontSize: 11,
              color: "#00FFB3",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 12,
            }}>
              THE NEW WAY
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
              48 hours
              <span style={{ fontSize: 16, color: "#B8C5D6", fontWeight: 400 }}>
                {" "}or less
              </span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {[
                "Post role → See verified matches instantly",
                "Interview candidates same day (if online)",
                "Hire with one click",
                "Candidate starts next week",
                "Done.",
              ].map((step, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 10,
                  fontSize: 14,
                  color: "#E8EAF6",
                  fontWeight: 500,
                }}>
                  <span style={{ color: "#00FFB3", fontWeight: 700 }}>✓</span>
                  {step}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24,
              padding: 14,
              background: "#00D9FF11",
              border: "1px solid #00D9FF33",
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
            }}>
              <div style={{ color: "#B8C5D6", marginBottom: 6 }}>Cost</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#00FFB3" }}>
                15%{" "}
                <span style={{ fontSize: 13, color: "#B8C5D6" }}>placement fee</span>
              </div>
              <div style={{ fontSize: 12, color: "#00D9FF", marginTop: 6 }}>
                First hire: 50% off
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 24px",
        borderTop: "1px solid #1E2447",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: 40,
        }}>
          <h2 style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 12,
          }}>
            How it works
          </h2>
          <p style={{
            fontSize: 16,
            color: "#B8C5D6",
          }}>
            Three steps. No complexity.
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {[
            {
              num: "01",
              title: "Post Your Role",
              desc: "Software tester? Cybersecurity analyst? Tell us what you need. Takes 90 seconds.",
              icon: "📝",
            },
            {
              num: "02",
              title: "See Verified Matches",
              desc: "Candidates with tested skills, background checks, and previous employer ratings.",
              icon: "⚡",
            },
            {
              num: "03",
              title: "Interview & Hire",
              desc: "Instant interview if both online. Or schedule for later. Hire with one click.",
              icon: "🤝",
            },
          ].map((step) => (
            <div key={step.num} style={{
              padding: 24,
              background: "#1E244711",
              border: "1px solid #1E2447",
              borderRadius: 12,
            }}>
              <div style={{
                fontSize: 40,
                marginBottom: 12,
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: 11,
                color: "#00D9FF",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 10,
                fontWeight: 600,
              }}>
                STEP {step.num}
              </div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 10,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: "#B8C5D6",
                lineHeight: 1.6,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 24px",
        borderTop: "1px solid #1E2447",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: 40,
        }}>
          <h2 style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 12,
          }}>
            Simple, fair pricing
          </h2>
          <p style={{
            fontSize: 16,
            color: "#B8C5D6",
          }}>
            Pay only when you hire. No monthly fees.
          </p>
        </div>

        <div style={{
          padding: 32,
          background: "linear-gradient(135deg, #1E2447 0%, #0F1432 100%)",
          border: "1px solid #2D3653",
          borderRadius: 16,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 8,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            15%
          </div>
          <div style={{
            fontSize: 18,
            color: "#B8C5D6",
            marginBottom: 28,
          }}>
            of total contract value
          </div>

          <div style={{
            padding: 20,
            background: "#0A0E27",
            borderRadius: 12,
            marginBottom: 20,
          }}>
            <div style={{
              fontSize: 13,
              color: "#6B7A99",
              marginBottom: 12,
            }}>
              Example: Software Tester
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 8,
            }}>
              <span style={{ color: "#B8C5D6" }}>$50/hr × 40hrs/wk × 12 wks</span>
              <span style={{ fontWeight: 600 }}>$24,000</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid #1E2447",
            }}>
              <span style={{ color: "#B8C5D6" }}>Queek fee (15%)</span>
              <span style={{ fontWeight: 600 }}>$3,600</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              fontWeight: 700,
            }}>
              <span>Total</span>
              <span style={{ color: "#00FFB3" }}>$27,600</span>
            </div>
          </div>

          <div style={{
            padding: 14,
            background: "#00D9FF11",
            border: "1px solid #00D9FF33",
            borderRadius: 8,
            fontSize: 13,
            color: "#00D9FF",
            fontWeight: 500,
            marginBottom: 20,
          }}>
            🎉 First hire: 50% off ($1,800 instead of $3,600)
          </div>

          <div style={{
            fontSize: 12,
            color: "#6B7A99",
            lineHeight: 1.6,
          }}>
            • No hire? No charge.<br />
            • 30-day quality guarantee: free replacement if it doesn't work out<br />
            • Compare: Traditional agencies charge 20-25%
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 24px 60px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 20,
        }}>
          Ready to hire faster?
        </h2>
        <p style={{
          fontSize: 16,
          color: "#B8C5D6",
          marginBottom: 32,
        }}>
          Post your first role in 90 seconds. See matches immediately.
        </p>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <input
            type="email"
            placeholder="your@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
            style={{
              padding: "18px 20px",
              width: "100%",
              background: "#1E2447",
              border: "1px solid #2D3653",
              borderRadius: 8,
              color: "#E8EAF6",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleGetStarted}
            style={{
              padding: "18px 36px",
              background: "#00D9FF",
              border: "none",
              borderRadius: 8,
              color: "#0A0E27",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #1E2447",
        padding: "32px 24px",
        textAlign: "center",
        color: "#6B7A99",
        fontSize: 13,
      }}>
        <div style={{ marginBottom: 12 }}>
          Qu<span style={{ color: "#00D9FF" }}>ee</span>k — Built in Edmonton for Edmonton
        </div>
        <div>
          Questions? Email hello@queek.ca
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0A0E27; }
        ::-webkit-scrollbar-thumb { background: #2D3653; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3D4663; }
      `}</style>
    </div>
  );
};

export default EmployerLanding;