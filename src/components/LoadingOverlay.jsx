export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
      <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
