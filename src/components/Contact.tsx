import { useState } from "react";
import { buildWhatsAppUrl, buildPhoneUrl, siteConfig } from "../config/siteConfig";

interface FormData {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  rank: string;
  category: string;
  branch: string;
  location: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  role: "Student",
  phone: "",
  whatsapp: "",
  rank: "",
  category: "",
  branch: "",
  location: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** Build a WhatsApp message from form data and open WhatsApp */
  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const parts: string[] = [
      `Hi, I am interested in KCET 2027 Counselling Guidance.`,
      ``,
      `Name: ${form.name || "—"}`,
      `Role: ${form.role}`,
      `Phone: ${form.phone || "—"}`,
      `KCET Rank: ${form.rank || "—"}`,
      `Category: ${form.category || "—"}`,
      `Preferred Branch: ${form.branch || "—"}`,
      `Preferred Location: ${form.location || "—"}`,
    ];
    if (form.message) parts.push(``, `Message: ${form.message}`);

    const text = parts.join("\n");
    const num = siteConfig.whatsappNumber;
    const url = num
      ? `https://wa.me/${num}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-gray-50"
      aria-label="Contact and enquiry"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left: info */}
          <div>
            <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Request Counselling Guidance
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Fill in your details and submit via WhatsApp. We'll get back to
              you with information about the counselling package and next steps.
            </p>

            {/* Contact options */}
            <div className="flex flex-col gap-4 mb-8">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-brand-200 hover:shadow-md transition-all group"
              >
                <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">WhatsApp</p>
                  <p className="text-gray-500 text-xs">
                    {siteConfig.whatsappNumber
                      ? `+${siteConfig.whatsappNumber}`
                      : "Message us on WhatsApp"}
                  </p>
                </div>
              </a>

              {siteConfig.phoneNumber && (
                <a
                  href={buildPhoneUrl()}
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <span className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Call Us</p>
                    <p className="text-gray-500 text-xs">{siteConfig.phoneNumber}</p>
                  </div>
                </a>
              )}

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <span className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Email</p>
                    <p className="text-gray-500 text-xs">{siteConfig.email}</p>
                  </div>
                </a>
              )}
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              This is a paid counselling guidance service. Contact us for
              current package details and pricing. We typically respond within
              one business day.
            </p>
          </div>

          {/* Right: enquiry form → WhatsApp */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
            <h3 className="text-gray-900 font-bold text-lg mb-1">
              Enquiry Form
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill in the details below. Clicking "Request Counselling" will
              open WhatsApp with your information pre-filled.
            </p>

            <form
              onSubmit={handleWhatsApp}
              noValidate
              aria-label="Counselling enquiry form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Student Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Student Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Student's full name"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Enquiring As
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
                  >
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Parent on behalf of student">Parent on behalf of student</option>
                  </select>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="If different from phone"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* KCET Rank */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rank" className="text-sm font-medium text-gray-700">
                    KCET Rank
                  </label>
                  <input
                    id="rank"
                    name="rank"
                    type="text"
                    value={form.rank}
                    onChange={handleChange}
                    placeholder="e.g. 4500"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="GM">GM (General Merit)</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                    <option value="Cat-1">Category 1</option>
                    <option value="2A">2A</option>
                    <option value="2B">2B</option>
                    <option value="3A">3A</option>
                    <option value="3B">3B</option>
                  </select>
                </div>

                {/* Preferred Branch */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="branch" className="text-sm font-medium text-gray-700">
                    Preferred Branch
                  </label>
                  <input
                    id="branch"
                    name="branch"
                    type="text"
                    value={form.branch}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Preferred Location */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Preferred Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any additional details, questions, or requirements..."
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-colors shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Request Counselling via WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  This will open WhatsApp with your details pre-filled.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
