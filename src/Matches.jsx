import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// ============================================================
// MATCHES PAGE — Sarah sees her matched candidates
// Reads job posting, queries Firebase, shows matches
// ============================================================

const Matches = () => {
  const navigate = useNavigate();
  const [jobPosting, setJobPosting] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatchesFromFirebase();
  }, []);

  const loadMatchesFromFirebase = async () => {
    // Get job posting from localStorage
    const savedJob = localStorage.getItem("jobPosting");
    if (!savedJob) {
      navigate("/employers/post-job");
      return;
    }

    const job = JSON.parse(savedJob);
    setJobPosting(job);

    // Fetch all candidates from Firebase
    const candidatesRef = collection(db, "candidates");
    const snapshot = await getDocs(candidatesRef);
    
    const allCandidates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter and score candidates
    const matched = allCandidates
      .map(candidate => ({
        ...candidate,
        matchScore: calculateMatchScore(job, candidate)
      }))
      .filter(c => c.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    setCandidates(matched);
    setLoading(false);
  };

  const calculateMatchScore = (job, candidate) => {
    let score = 0;

    // Rate check (must be at or below job budget)
    if (candidate.rate > job.rate) return 0;

    // Skills match (candidate has required skills)
    const candidateSkills = Array.isArray(candidate.skills) 
      ? candidate.skills.map(s => typeof s === 'string' ? s.toLowerCase() : '')
      : [];
    
    const jobSkills = Array.isArray(job.skills)
      ? job.skills.map(s => s.toLowerCase())
      : [];

    if (jobSkills.length === 0) {
      score = 80; // If no specific skills required, base match
    } else {
      const matchedSkills = jobSkills.filter(skill => 
        candidateSkills.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
      );
      
      const skillMatchPercent = (matchedSkills.length / jobSkills.length) * 100;
      score = skillMatchPercent;
    }

    // Rate bonus (cheaper is better, but not too much weight)
    const rateBonus = ((job.rate - candidate.rate) / job.rate) * 10;
    score += rateBonus;

    return Math.min(Math.round(score), 100);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0A0E27",
        color: "#E8EAF6",
        fontFamily: "'IBM Plex Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 60,
            height: 60,
            border: "4px solid #1E2447",
            borderTop: "4px solid #00D9FF",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px",
          }} />
          <div style={{ fontSize: 16, color: "#B8C5D6" }}>
            Searching for matches...
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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
          onClick={() => navigate("/employers/post-job")}
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
        {/* Job Summary */}
        {jobPosting && (
          <div style={{
            background: "#1E2447",
            border: "1px solid #2D3653",
            borderRadius: 12,
            padding: 20,
            marginBottom: 32,
          }}>
            <div style={{
              fontSize: 13,
              color: "#00D9FF",
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 12,
            }}>
              YOUR ROLE
            </div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 14,
              color: "#B8C5D6",
            }}>
              <span>${jobPosting.rate}/hr</span>
              <span>•</span>
              <span>{jobPosting.duration}</span>
              <span>•</span>
              <span style={{ textTransform: "capitalize" }}>{jobPosting.location}</span>
            </div>
          </div>
        )}

        {/* Matches Header */}
        <div style={{
          marginBottom: 24,
        }}>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
          }}>
            {candidates.length === 0 ? "No matches yet" : 
             candidates.length === 1 ? "1 candidate matches" :
             `${candidates.length} candidates match`}
          </h2>
          <p style={{
            fontSize: 15,
            color: "#B8C5D6",
            lineHeight: 1.6,
          }}>
            {candidates.length === 0 
              ? "We'll notify you when candidates with these skills join the platform."
              : "All candidates have verified skills matching your requirements."}
          </p>
        </div>

        {/* Candidate Cards */}
        {candidates.length > 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                style={{
                  background: "#1E2447",
                  border: "1px solid #2D3653",
                  borderRadius: 12,
                  padding: 24,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#00D9FF44";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#2D3653";
                }}
              >
                {/* Match Score */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#E8EAF6",
                  }}>
                    {candidate.name ? `${candidate.name.charAt(0).toUpperCase()}***` : `Candidate #${candidate.id.substring(0, 6)}`}
                  </div>
                  <div style={{
                    padding: "6px 12px",
                    background: candidate.matchScore >= 80 ? "#00FFB311" : "#00D9FF11",
                    border: `1px solid ${candidate.matchScore >= 80 ? "#00FFB333" : "#00D9FF33"}`,
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                    color: candidate.matchScore >= 80 ? "#00FFB3" : "#00D9FF",
                  }}>
                    {candidate.matchScore}% match
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{
                    fontSize: 12,
                    color: "#6B7A99",
                    marginBottom: 8,
                  }}>
                    VERIFIED SKILLS
                  </div>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                    {(Array.isArray(candidate.skills) ? candidate.skills : []).map((skill, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "6px 12px",
                          background: "#0A0E27",
                          border: "1px solid #2D3653",
                          borderRadius: 6,
                          fontSize: 13,
                          color: "#E8EAF6",
                        }}
                      >
                        ✓ {typeof skill === 'string' ? skill : 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rate */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: "1px solid #2D3653",
                }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>
                      MINIMUM RATE
                    </div>
                    <div style={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#00FFB3",
                    }}>
                      ${candidate.rate}/hr
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#6B7A99", marginBottom: 4 }}>
                      LOCATION
                    </div>
                    <div style={{ fontSize: 14, color: "#E8EAF6" }}>
                      Edmonton, AB
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: 12,
                }}>
                  <button
                    onClick={() => alert(`🎥 Interview request sent to ${candidate.name}!\n\nIn the full app:\n• They'd get a notification\n• You'd connect via video in <60 seconds\n• After interview, you click "Hire" to proceed`)}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "#00D9FF",
                      border: "none",
                      borderRadius: 8,
                      color: "#0A0E27",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <button
  onClick={() => navigate("/employers/hire-confirm", {
    state: { candidate, jobPosting }
  })}
  style={{
    flex: 1,
    padding: "14px",
    background: "#00D9FF",
    border: "none",
    borderRadius: 8,
    color: "#0A0E27",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Hire {candidate.name}
</button>
                  </button>
                  <button
                    onClick={() => alert("📋 Full profile coming soon!\n\nYou'd see:\n• Verified skills with scores\n• Previous employer ratings\n• Availability calendar\n• Background check status")}
                    style={{
                      padding: "14px 20px",
                      background: "transparent",
                      border: "1px solid #2D3653",
                      borderRadius: 8,
                      color: "#B8C5D6",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No matches state
          <div style={{
            textAlign: "center",
            padding: "60px 24px",
          }}>
            <div style={{
              fontSize: 48,
              marginBottom: 24,
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 12,
            }}>
              No matches yet
            </h3>
            <p style={{
              fontSize: 15,
              color: "#B8C5D6",
              lineHeight: 1.6,
              marginBottom: 32,
            }}>
              We're actively searching for candidates with these skills.<br />
              We'll email you at <strong>{JSON.parse(localStorage.getItem('employer') || '{}').email || 'your email'}</strong> when matches become available.
            </p>
            <button
              onClick={() => navigate("/employers/post-job")}
              style={{
                padding: "14px 24px",
                background: "transparent",
                border: "1px solid #2D3653",
                borderRadius: 8,
                color: "#00D9FF",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Post Another Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;