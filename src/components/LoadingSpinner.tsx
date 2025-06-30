export default function LoadingSpinner() {
  return (
    <>
      <div
        className="animate-spin border-4 border-accent border-t-transparent h-12 w-12 rounded-full mx-auto"
        style={{
          backgroundColor: 'var(--background-elements)',
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}
