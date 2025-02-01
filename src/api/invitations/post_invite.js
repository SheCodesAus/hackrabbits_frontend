import { API_BASE_URL } from '../../config/constants';

/**
 * Sends an invitation to a potential role model
 * @param {Object} inviteData - Data for the invitation
 * @param {string} inviteData.fullName - Full name of the invitee
 * @param {string} inviteData.email - Email of the invitee
 * @param {string} inviteData.industry - Industry of the invitee
 * @param {string} inviteData.currentRole - Current role of the invitee
 * @param {string} inviteData.whyInspiring - Reason why the invitee is inspiring
 * @returns {Promise} Response from the server
 */
export const sendInvitation = async (inviteData) => {
  try {
    // Use environment variable for API URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    
    const response = await fetch(`${API_URL}/invitations/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        full_name: inviteData.fullName,
        email: inviteData.email,
        industry: inviteData.industry,
        current_role: inviteData.currentRole,
        why_inspiring: inviteData.whyInspiring
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid invitation data');
      }
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      if (response.status === 403) {
        throw new Error('Not authorized to send invitations');
      }
      if (response.status === 429) {
        throw new Error('Too many invitation attempts. Please try again later');
      }
      throw new Error(data.message || 'Failed to send invitation');
    }

    return data;
  } catch (error) {
    console.error('Invitation error:', error);
    // Rethrow the error with a user-friendly message
    throw new Error(
      error.message || 
      'Unable to send invitation. Please check your connection and try again.'
    );
  }
};

export default sendInvitation;