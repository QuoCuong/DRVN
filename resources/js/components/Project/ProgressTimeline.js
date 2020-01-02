import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react'
import ProjectStatusBadge from '../badges/ProjectStatusBadge'
import ConfirmProgressButton from './actionButtons/ConfirmProgressButton'
import RichCollapse from '../RichCollapse'
import CreateIssueButton from './actionButtons/CreateIssueButton'

const ProgressTimeline = props => {
    const { progresses, projectStatus, handleActionCompleted } = props

    return (
        <>
            {
                progresses.length ? (
                    <Timeline lineColor="#ddd">
                        {
                            progresses.map((progress, i) => {
                                const { images } = progress

                                return (
                                    <TimelineItemStyled
                                        key={i}
                                        dateText={moment(progress.created_at).format('DD/MM/YYYY hh:mm:ss A')}
                                        dateInnerStyle={{ background: 'transparent', color: 'rgb(51, 51, 51)' }}
                                        style={{ color: progress.is_complete && 'rgb(77, 189, 116)' }}
                                    >
                                        <div className="header">
                                            <div>
                                                <h3>{progress.name}</h3>
                                                {
                                                    progress.is_complete ? (
                                                        <ProjectStatusBadge status="completed" />
                                                    ) : null
                                                }
                                                <ConfirmProgressButton
                                                    progressId={progress.id}
                                                    is_complete={progress.is_complete}
                                                    confirmed_at={progress.confirmed_at}
                                                    handleActionCompleted={handleActionCompleted}
                                                />
                                                <CreateIssueButton
                                                    progressId={progress.id}
                                                    issues={progress.issues}
                                                    projectStatus={projectStatus}
                                                    handleActionCompleted={handleActionCompleted}
                                                />
                                            </div>
                                            {
                                                progress.is_complete ? (!progress.confirmed_at ? (
                                                    <span className="badge badge-secondary badge-pill">
                                                        <i className="fa fa-close"></i> Chưa xác nhận
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-success badge-pill">
                                                        <i className="fa fa-check"></i> Đã xác nhận
                                                    </span>
                                                )) : null
                                            }
                                        </div>
                                        <RichCollapse buttonName="Mô tả">
                                            {progress.description}
                                        </RichCollapse>
                                        <RichCollapse buttonName="Vấn đề" buttonClass="text-danger">
                                            {progress.issues}
                                        </RichCollapse>
                                        {
                                            images.length ? (
                                                <FancyboxImageWrapper>
                                                    {
                                                        images.map((image, i) => {
                                                            return (
                                                                <FancyboxItem key={i} >
                                                                    <a href={image.path} data-fancybox={progress.name}>
                                                                        <FancyboxImage src={image.path} />
                                                                    </a>
                                                                </FancyboxItem>
                                                            )
                                                        })
                                                    }
                                                </FancyboxImageWrapper>
                                            ) : null
                                        }
                                    </TimelineItemStyled>
                                )
                            })
                        }
                    </Timeline>
                ) : null
            }
        </>
    )
}

const FancyboxImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`

const FancyboxItem = styled.div`
    width: 200px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
`

const FancyboxImageWrapper = styled.div``

const TimelineItemStyled = styled(TimelineItem)`
    .timeline-item-date {
        background: transparent;
    }

    .body {
        .header {
            margin-bottom: 1rem;

            & > div {
                display: flex;
                align-items: center;

                & *:not(:last-child) {
                    margin-right: 0.5rem;
                }
            }
        }
    }
`

export default ProgressTimeline
