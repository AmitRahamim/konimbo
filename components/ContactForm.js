import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "שגיאה בשליחה");
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("אירעה שגיאה. נסה שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">צור קשר</h2>

      <input
        type="text"
        name="name"
        placeholder="שם מלא"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="אימייל"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="message"
        placeholder="הודעה"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "שולח..." : "שלח"}
      </button>

      {success && (
        <p className="text-green-600 text-center">
          ההודעה נשלחה בהצלחה ✅
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center">{error}</p>
      )}
    </form>
  );
}
