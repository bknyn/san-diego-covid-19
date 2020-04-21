import React from "react"

const StandardPage = ({title, dataEdges}) => {
  console.log(dataEdges)
  return (
    <div className="layout--standard-page">
      <h1 className="title--main layout__header--standard-page">{title}</h1>

      <div className="layout__charts--standard-page">
        Charts
      </div>

      <div className="layout__scorecards--standard-page">
        <h2 className="title--section">Today vs Yesterday</h2>
        Scorecards
      </div>
    </div>
  )
}

export default StandardPage
