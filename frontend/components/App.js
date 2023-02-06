import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => {navigate('/articles')}

  const logout = () => {
    localStorage.clear()
    redirectToLogin()
    setMessage('GoodBye!')
  }

  const login = ({ username, password }) => {
    const user = {
      username: username,
      password: password
    }
    axios.post(loginUrl, user)
    .then(res => {
      setSpinnerOn(true)
      setMessage(res.data.message)
      localStorage.setItem('token', res.data.token)
      navigate('/articles')
    })
    .catch(err => console.error(err))
  }

  const getArticles = () => {
    const token = localStorage.getItem('token')
    axios.create({baseURL: 'http://localhost:9000/api', headers: {authorization: token}})
    .get(articlesUrl)
    .then(res => {
      setSpinnerOn(false)
      setMessage(res.data.message)
      setArticles(res.data.articles)
    })
    .catch(err => {
      console.log(err)
      redirectToLogin()
    })
  }
  const gitArticles = () => {
    const token = localStorage.getItem('token')
    axios.create({baseURL: 'http://localhost:9000/api', headers: {authorization: token}})
    .get(articlesUrl)
    .then(res => {
      setSpinnerOn(false)
      setArticles(res.data.articles)
    })
    .catch(err => console.log(err))
  }

  const postArticle = article => {
    const token = localStorage.getItem('token')
    axios.create({baseURL: 'http://localhost:9000/api', headers: {authorization: token}})
    .post(articlesUrl, article)
    .then(res => {
      gitArticles()
      setMessage(res.data.message)
    })
    .catch(err => console.log(err))
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    const token = localStorage.getItem('token')
    axios.create({baseURL: 'http://localhost:9000/api', headers: {authorization: token}})
    .delete(`http://localhost:9000/api/articles/${article_id}`)
    .then(res => {
      setMessage(res.data.message)
      gitArticles()
    })
    .catch(err => console.log(err))
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} />
              <Articles articles={articles} getArticles={getArticles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId} />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
