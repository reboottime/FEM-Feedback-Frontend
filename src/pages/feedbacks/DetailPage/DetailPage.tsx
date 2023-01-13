import React from 'react';
import { Link, useParams } from 'react-router-dom';

import AddComment from './components/AddComment';
import Card from './components/Card';
import Metadata from './components/Metadata';
import CommentList from './components/CommentList';

import { ReactComponent as EmptyImg } from '@/assets/suggestions/illustration-empty.svg';

import { useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import Goback from '@/components/Goback';
import ToHome from '@/components/ToHome';
import UserIcon from '@/components/UserIcon';
import YouAreLost from '@/components/YouAreLost';

import {
  useGetFeedback,
  useGetFeedbackComments,
} from '@/hooks/queries/feedbacks';
import { useIsSmallMobile } from '@/hooks/mediaQueries';

import { isPublishedFeedback } from '@/utils/feedback';
import { isAdminUser } from '@/utils/user';

import './style.scss';

export const DetailPage = () => {
  const { feedbackId = '' } = useParams();
  const isSmallMobile = useIsSmallMobile();
  const { user } = useAuthContext();

  const {
    data: feedback,
    isFetched: feedbackIsFeched,
  } = useGetFeedback(feedbackId);
  const {
    data: comments = [],
    isSuccess: commentsAreLoaded,
  } = useGetFeedbackComments(feedback?.id ?? '');


  if (feedbackIsFeched && !feedback) {
    // return early
    return (
      <div className="detail-page">
        <header className="detail-page__header">
          <Goback />
          <div className="detail-page__header-nav">
            {user && <UserIcon />}
            <ToHome />
          </div>
        </header>
        <Card title='You are lost'>
          <YouAreLost />
        </Card>
      </div>
    );
  }

  const commentCardTitle = comments.length
    ? `${comments.length} Comments`
    : 'Comments';

  const canEdit = user && (user?.id === feedback?.author?.id) || isAdminUser(user);
  const isEditable = !isPublishedFeedback(feedback) && canEdit;

  return (
    <div className="detail-page">
      <header className="detail-page__header">
        <Goback />
        <div className="detail-page__header-nav">
          {isEditable && (
            <Link to={`/feedbacks/${feedbackId}/edit`}>
              <Button small={isSmallMobile}
                variant="blue">
                Edit
              </Button>
            </Link>
          )}
          {user && <UserIcon />}
          <ToHome />
        </div>
      </header>
      <Card>
        <Metadata feedbackId={feedbackId} />
      </Card>
      <Card title={commentCardTitle}>
        {/* isLoading */}
        {commentsAreLoaded && (
          <React.Fragment>
            {comments.length
              ? (
                <CommentList
                  comments={comments}
                  replyToComment={undefined}
                />
              )
              : (
                <div className="detail-page__no-comments">
                  <EmptyImg />
                  <p className="typography-body-1">No comments so far</p>
                </div>
              )}
          </React.Fragment>
        )}
      </Card>
      {commentsAreLoaded && (
        <Card title="Add Comment">
          <AddComment toFeedback={feedbackId} />
        </Card>
      )}
    </div>
  );
};

export default DetailPage;
