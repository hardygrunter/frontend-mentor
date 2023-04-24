import { TcommentData } from "../../../store/comments";
import styles from "./metaData.module.css";

type TmetaData = Pick<TcommentData, "user" | "createdAt">;

export const MetaData = ({ user, createdAt }: TmetaData) => {
  return (
    <div className={styles.metaData}>
      <picture>
        <source srcSet={user.image?.webp} type="image/webp" />
        <img src={user.image?.png} className={styles.avatar} alt="avatar" />
      </picture>
      <a href="#" className={styles.username}>
        {user.username}
      </a>
      <span className={styles.createdAt}>{postedAgo(+createdAt)}</span>
    </div>
  );
};


const postedAgo = (timestamp: number) => {
  if (isNaN(timestamp)) {
    throw new Error("Timestamp is not a number");
  }

  const dif = Date.now() - timestamp;

  const s = dif / 1000;
  const m = s / 60;
  const h = m / 60;
  const d = h / 24;
  const w = d / 7;
  const mt = w / 4;
  const y = mt / 12;

  const format = {
    unit: Math.floor(s),
    value: 'second',
    get posted() {
      return `${this.unit} ${this.value}${this.unit > 1 ? "s" : ""} ago`;
    }
  };

  if (s < 5) {
    return "now";
  } else if (s < 60) {
    return format.posted;
  } else if (m < 60) {
    format.unit = Math.round(m);
    format.value = "minute";
  } else if (h < 24) {
    format.unit = Math.round(h);
    format.value = "hour";
  } else if (d < 7) {
    format.unit = Math.round(d);
    format.value = "day";
  } else if (w <= 4) {
    format.unit = Math.round(w);
    format.value = "week";
  } else if (mt < 12) {
    format.unit = Math.round(mt);
    format.value = "month";
  } else {
    format.unit = Math.floor(y);
    format.value = "year";
  }

  return format.posted;
};
