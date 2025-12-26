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
        {draftStartDate && <div>Started: <Date dateString={draftStartDate} /></div>}
        {lastUpdated && <div>Last updated: <Date dateString={lastUpdated} /></div>}
      </div>
      <p className={styles.message}>
        This article is a work in progress. I'm documenting my learning journey in real-time.
      </p>
    </div>
  )
}
