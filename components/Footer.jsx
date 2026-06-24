export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '1.5rem',
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
    }}>
      © {new Date().getFullYear()} NexArena Esports Portal · Built for Tamil Nadu's gaming community
    </footer>
  )
}
