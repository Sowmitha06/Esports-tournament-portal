export default function StatCard({ icon, label, value, accent = 'purple' }) {
  return (
    <div className="glass card fade-up" style={{ textAlign: 'center' }}>
      <div style={{
        width: 52, height: 52, margin: '0 auto 0.8rem',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem',
        background: accent === 'purple'
          ? 'linear-gradient(135deg, #7c3aed, #2563eb)'
          : accent === 'cyan'
          ? 'linear-gradient(135deg, #06b6d4, #2563eb)'
          : accent === 'green'
          ? 'linear-gradient(135deg, #34d399, #06b6d4)'
          : 'linear-gradient(135deg, #fbbf24, #7c3aed)',
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.8rem' }}>{value}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{label}</p>
    </div>
  )
}
