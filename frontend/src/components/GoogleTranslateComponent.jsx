import { useEffect } from "react";

function GoogleTranslateComponent() {
	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
		script.async = true;
		document.body.appendChild(script);

		window.loadGoogleTranslate = () => {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: "en", // Default language is set to English
					includedLanguages: "en,am,om", // Include Amharic (am) and Oromo (om)
					layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
					gaTrack: true,
					displayOnLoad: true
				},
				"google_element"
			);
		};

		return () => {
			document.body.removeChild(script);
			delete window.loadGoogleTranslate;
		};
	}, []);

	return (
		<div>
			<div id="google_element" className="google-translate"></div>
		</div>
	);
}

export default GoogleTranslateComponent;
