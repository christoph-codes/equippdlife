"use client";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { useState } from "react";

const RequestPrayerForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [prayerRequest, setPrayerRequest] = useState("");
	const [followUp, setFollowUp] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [error, setError] = useState<string>("");

	const clearForm = () => {
		setName("");
		setEmail("");
		setPrayerRequest("");
		setFollowUp(false);
		setError("");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email || !prayerRequest) {
			setError("Please fill in all required fields.");
			return;
		}
		setError("");
		// mailto the prayer request details
		const mailtoLink = `mailto:equippd@gmail.com?subject=Prayer Request from ${encodeURIComponent(
			name
		)}&body=${encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPrayer Request: ${prayerRequest}\nFollow Up: ${
				followUp ? "Yes" : "No"
			}`
		)}`;
		window.location.href = mailtoLink;

		// clear once submitted
		setIsSubmitted(true);
		clearForm();
	};
	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<Input
				name="name"
				label="Name"
				placeholder="Your name"
				value={name}
				onChange={setName}
			/>
			<Input
				name="email"
				label="Email"
				placeholder="Your email"
				value={email}
				onChange={setEmail}
			/>
			<Input
				name="prayerRequest"
				label="Prayer Request"
				placeholder="Your prayer request"
				value={prayerRequest}
				onChange={setPrayerRequest}
				type="textarea"
				rows={5}
			/>
			<p className="text-xs">
				Your prayer request will be kept confidential and shared only with our
				trusted prayer team. We honor your privacy and treat every request with
				care.
			</p>
			<Checkbox
				name="followUp"
				label="Would you like a follow-up?"
				value={followUp}
				onChange={setFollowUp}
			/>

			{error && <p className="text-negative font-bold">{error}</p>}

			{isSubmitted ? (
				<>
					<hr className="my-8" />
					<h3 className="text-green-300">May God Strengthen You Today</h3>

					<p>
						Thank you for your prayer request. Our hope is that you feel seen,
						supported, and reminded that God is with you in every season.
					</p>
					<p>We are grateful for the opportunity to pray alongside you.</p>
				</>
			) : (
				<Button type="submit">Submit Prayer Request</Button>
			)}
		</form>
	);
};

export default RequestPrayerForm;
