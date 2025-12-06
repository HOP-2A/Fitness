"use client";
import { useRouter } from "next/navigation";
import { Footer } from "../_components/Footer";

export default function Leaderboard() {
  const { push } = useRouter();

  const Back = () => {
    push("/");
  };
  return (
    <div>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <span style={styles.back} onClick={Back}>
            ←
          </span>
          <h2>Leaderboard</h2>
        </div>

        {/* TOP 3 */}
        <div style={styles.top3}>
          {/* 2-р байр */}
          <div style={styles.topItem}>
            <div style={{ ...styles.avatarCircle, width: 60, height: 60 }}>
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                style={styles.img}
              />
              <span style={styles.rank}>2</span>
            </div>
            <p style={styles.name}>Meghan Jes...</p>
            <p style={styles.pts}>40 pts</p>
          </div>

          {/* 1-р байр */}
          <div style={{ ...styles.topItem, transform: "translateY(-10px)" }}>
            <div style={styles.crown}>👑</div>
            <div style={{ ...styles.avatarCircle, width: 100, height: 100 }}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                style={styles.img}
              />
              <span style={styles.rank}>1</span>
            </div>
            <p style={styles.name}>Bryan Wolf</p>
            <p style={styles.pts}>43 pts</p>
          </div>

          {/* 3-р байр */}
          <div style={styles.topItem}>
            <div style={{ ...styles.avatarCircle, width: 60, height: 60 }}>
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                style={styles.img}
              />
              <span style={styles.rank}>3</span>
            </div>
            <p style={styles.name}>Alex Turner</p>
            <p style={styles.pts}>38 pts</p>
          </div>
        </div>

        {/* LIST */}
        <div style={styles.list}>
          {[
            ["4", "Marsha Fisher", "36 pts"],
            ["5", "Juanita Cormier", "35 pts"],
            ["6", "You", "34 pts", "active"],
            ["7", "Tamara Schmidt", "33 pts"],
            ["8", "Ricardo Veum", "32 pts"],
            ["9", "Gary Sanford", "31 pts"],
            ["10", "Becky Bartell", "30 pts"],
          ].map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.row,
                background: item[3] === "active" ? "#d9f48f" : "#fff",
              }}
            >
              <span>{item[0]}</span>
              <p>{item[1]}</p>
              <b>{item[2]}</b>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ✅ INLINE STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  back: {
    position: "absolute",
    left: 0,
    fontSize: 20,
    cursor: "pointer",
  },
  top3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 25,
  },
  topItem: {
    textAlign: "center",
    width: "30%",
  },
  avatarCircle: {
    position: "relative",
    borderRadius: "50%",
    padding: 4,
    background: "#d9f48f",
    margin: "0 auto",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  rank: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#d9f48f",
    padding: "4px 8px",
    borderRadius: "50%",
    fontWeight: "bold",
  },
  crown: {
    fontSize: 24,
    marginBottom: 4,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
  },
  pts: {
    color: "#7cae00",
    fontWeight: "bold",
  },
  list: {
    background: "#f6fbe6",
    borderRadius: 14,
    padding: 12,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
};
