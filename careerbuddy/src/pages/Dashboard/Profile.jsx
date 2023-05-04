import authContext from 'context/auth/authContext'
import {useContext} from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg'
import {Roles} from 'utils/constant'
import {Link} from 'react-router-dom'

import './Profile.css'

const Profile = () => {
  const {user} = useContext(authContext)

  return (
    <div>
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-10">
            <div class="card p-3 py-4">
              <div class="text-center">
                {user?.profile_picture?.length ? (
                  <img src={user?.profile_picture} alt="User" width="100" class="rounded-circle" />
                ) : (
                  <CgProfile
                    style={{
                      fontSize: '100px',
                      display: 'flex',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                )}
                {/* <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" /> */}
              </div>

              <div class="text-center mt-3">
                <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                <h5 class="mt-2 mb-0">{user?.name}</h5>
                <span>{user?.email}</span>
                <span>{user?.title ? <span>{user?.title}</span> : <span>Unset</span>}</span>

                <div class="px-4 mt-1">
                  <p class="fonts">{user?.bio ? <span>{user?.bio}</span> : <span>Unset</span>}</p>
                </div>
                <div class="px-4 mt-1">
                  <p class="fonts">
                    <p style={{color: 'black', fontWeight: '700'}}> Skills:</p>
                    {user?.skills?.length ? (
                      user.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
                    ) : (
                      <span>Unset</span>
                    )}
                  </p>
                </div>
                {user?.role === Roles.MENTOR ? (
                  <div>
                    <p style={{color: 'black', whiteSpace: 'nowrap'}}> Meeting Link:</p>

                    {user?.meeting_link ? (
                      <a href={user?.meeting_link} target="_blank" rel="noreferrer">
                        {user?.meeting_link}
                      </a>
                    ) : (
                      <span>
                        You haven't set this, students will still be able to contact you via email
                      </span>
                    )}
                  </div>
                ) : null}

                <ul class="social-list">
                  <li>
                    <i class="fa fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fa fa-dribbble"></i>
                  </li>
                  <li>
                    <i class="fa fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fa fa-linkedin"></i>
                  </li>
                  <li>
                    <i class="fa fa-google"></i>
                  </li>
                </ul>

                <div class="buttons">
                  <Link to="/dashboard/edit-profile">
                    <button class="btn btn-outline-primary px-4">Edit Profile</button>
                  </Link>
                  <Link to="/dashboard/settings">
                    <button
                      class="btn btn-primary px-4 ms-3"
                      style={{backgroundColor: '#8E24AA', color: 'white'}}
                    >
                      Settings
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
