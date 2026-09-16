export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
        <p className="font-body text-sm text-ink/70">
          Centre for Ayurveda Biology, Jawaharlal Nehru University
        </p>
        <p className="font-body text-sm text-ink/50">
          {/* TODO: replace with the Centre's real contact details before launch */}
          Contact details — to be added
        </p>
      </div>
    </footer>
  );
}
