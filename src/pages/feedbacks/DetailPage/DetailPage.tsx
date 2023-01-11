import React from 'react';
import { Link, useParams } from 'react-router-dom';

import AddComment from './components/AddComment';
import Card from './components/Card';
import Metadata from './components/Metadata';

import CommentList from './components/CommentList/CommentList';
import mockComments from './comments';
import { ReactComponent as EmptyImg } from '@/assets/suggestions/illustration-empty.svg';
import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import Goback from '@/components/Goback';
import ToHome from '@/components/ToHome';
import UserIcon from '@/components/UserIcon';

import {
  useGetFeedback,
  useGetFeedbackComments,
} from '@/hooks/queries/feedbacks';
import { useIsSmallMobile } from '@/hooks/mediaQueries';

import { isAdminUser } from '@/utils/user';

import './style.scss';

export const DetailPage = () => {
  const { feedbackId = '' } = useParams();
  const isSmallMobile = useIsSmallMobile();

  const { user } = useAuthContext() as AuthContextType;

  const { data = {} as TFeedbackOverview } = useGetFeedback(feedbackId);
  const { data: comments = mockComments, isSuccess: commentsAreLoaded } =
    useGetFeedbackComments(feedbackId);

  const commentCardTitle = (comments as Entities.TComment[]).length
    ? `${(comments as Entities.TComment[]).length} Comments`
    : 'Comments';

  const canEdit = user?.id === (data as TFeedbackOverview).author?.id || isAdminUser(user);
  const isEditable = (data.status === 'new') && canEdit;

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
        {/* isSuccess */}
        {/* no data */}
        {commentsAreLoaded && (
          <React.Fragment>
            {(comments as Entities.TComment[]).length
              ? (
                <CommentList
                  comments={comments as Entities.TComment[]}
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
      <Card title="Add Comment">
        <AddComment toFeedback={feedbackId} />
      </Card>
    </div>
  );
};

export default DetailPage;

type TFeedbackOverview = Omit<Entities.Feedback.TFeedback, 'comments'>;
