import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  
  const {getArticles, deleteArticle, articles, setCurrentArticleId} = props
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
  const deleteHandle = (e) => {
  
    const {value} = e.target
    deleteArticle(value)
    
  }


  const editHandle = (article, article_id) => {
    const art = {
      title: article.title,
      text: article.text,
      topic: article.topic,
      article_id: article_id
    }
    setCurrentArticleId(art)
    console.log(art)
  }

  useEffect(() => {
    
    // ✨ grab the articles here, on first render only
     getArticles()
  }, [])

  return (
    

    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map((art, idx) => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button onClick={() => editHandle(articles[idx], art.article_id)}>Edit</button>
                  <button value={art.article_id} onClick={deleteHandle}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
