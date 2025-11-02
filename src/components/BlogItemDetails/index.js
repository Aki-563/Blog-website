import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

const BlogItemDetails = () => {
  const [blogData, setBlogData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const getBlogItemData = async () => {
      const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
      const data = await response.json()

      const updatedData = {
        title: data.title,
        imageUrl: data.image_url,
        content: data.content,
        avatarUrl: data.avatar_url,
        author: data.author,
      }

      setBlogData(updatedData)
      setIsLoading(false)
    }

    getBlogItemData()
  }, [id])

  const {title, imageUrl, content, avatarUrl, author} = blogData

  return (
    <div className="blog-container">
      {isLoading ? (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <div className="blog-info">
          <h2 className="blog-details-title">{title}</h2>
          <div className="author-details">
            <img className="author-pic" src={avatarUrl} alt={author} />
            <p className="details-author-name">{author}</p>
          </div>
          <img className="blog-image" src={imageUrl} alt={title} />
          <p className="blog-content">{content}</p>
        </div>
      )}
    </div>
  )
}

export default BlogItemDetails
