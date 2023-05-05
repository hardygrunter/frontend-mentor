import React, { useState, useEffect, useRef } from "react";
import styles from "./commentForm.module.css";

interface IcommentForm {
  onSubmit: (content: string) => void;
  defValue?: string;
  inFocus?: boolean;
  sendBtn: string;
}

export const CommentForm = ({
  defValue = "",
  sendBtn = "Send",
  onSubmit,
  inFocus,
}: IcommentForm) => {
  const [value, setValue] = useState(defValue);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current && inFocus) {
      ref.current.setSelectionRange(value.length, value.length);
      ref.current.focus();
    }
  }, [inFocus]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;

      ref.current.style.height = scrollHeight + "px";
    }
  }, [ref, value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    setValue(val);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const notEmpty = value.trim();

    if (notEmpty) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        name="comment"
        className={styles.input}
        ref={ref}
        value={value}
        rows={1}
        onChange={handleChange}
        placeholder="Add a comment&hellip;"
      />
      <button type="submit" className={styles.btn}>
        {sendBtn}
      </button>
    </form>
  );
};
