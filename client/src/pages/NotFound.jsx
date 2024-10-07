export default function NotFound() {
    return (
        <div className="container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.</p>
            <a href="/" className="back-home">Go Back Home</a>
        </div>
    );
}