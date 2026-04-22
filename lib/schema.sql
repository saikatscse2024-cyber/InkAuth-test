-- Create Books Table
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    description TEXT,
    cover_image TEXT,
    rating REAL DEFAULT 0,
    total_chapters INTEGER DEFAULT 0,
    status TEXT CHECK(status IN ('ongoing', 'completed')) DEFAULT 'ongoing',
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Chapters Table
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Index for slug-based fetching (Performance)
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
CREATE INDEX IF NOT EXISTS idx_chapters_slug ON chapters(slug);
CREATE INDEX IF NOT EXISTS idx_chapters_book_id ON chapters(book_id);

-- Insert Dummy Book
INSERT OR IGNORE INTO books (slug, title, author, genre, description, cover_image, rating, total_chapters, status)
VALUES (
    'the-silent-echo',
    'The Silent Echo',
    'Elena Vance',
    'Mystery',
    'A journey through the whispers of history. In the heart of an ancient library, a forgotten manuscript reveals secrets that have been buried for centuries.',
    '/covers/cover1.png',
    4.8,
    2,
    'completed'
);

-- Insert Dummy Chapters (with LaTeX)
INSERT OR IGNORE INTO chapters (book_id, slug, title, content, chapter_number)
VALUES (
    1,
    'the-whispering-walls',
    'The Whispering Walls',
    '# Chapter 1: The Whispering Walls\n\n Elena entered the inner sanctum. The air was thick with the scent of ozone and ancient parchment. She noticed an inscription on the pedestal:\n\n $$\mathcal{L} = \int_{0}^{\infty} e^{-st} f(t) dt$$\n\nIt was the Laplace transform, but used here as a key to unlocking the sensory memories of the room. As she touched the ink, the walls began to vibrate.',
    1
);

INSERT OR IGNORE INTO chapters (book_id, slug, title, content, chapter_number)
VALUES (
    1,
    'forbidden-knowledge',
    'Forbidden Knowledge',
    '# Chapter 2: Forbidden Knowledge\n\n The manuscript revealed more than just history; it revealed the geometry of truth itself. \n\n $$A = \pi r^2$$\n\n Simple, yet elegant. Elena realized that the library itself was constructed using these principles. Every arch was a parabola, every dome a perfect hemisphere.',
    2
);
