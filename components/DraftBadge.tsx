import styles from './DraftBadge.module.css'
import Date from './Date'

export default function DraftBadge({ draftStartDate, lastUpdated }: {
  draftStartDate?: string
  lastUpdated?: string
}) {
  return (
    <div className={styles.draftBadge}>
      <span className={styles.badge}>DRAFT</span>
      <div className={styles.metadata}>
        {draftStartDate && <div>Início: <Date dateString={draftStartDate} /></div>}
        {lastUpdated && <div>Última atualização: <Date dateString={lastUpdated} /></div>}
      </div>
      <p className={styles.message}>
        Este artigo está em progresso. Estou documentando minha jornada de aprendizado em tempo real.
      </p>
    </div>
  )
}
