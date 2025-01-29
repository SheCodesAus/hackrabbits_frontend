import { API_BASE_URL } from '../../config/constants';

export const sendInvitation = async (inviteData) => {
  try {
    const response = await fetch('https://sheinspires-e47cb098889c.herokuapp.com/invitations/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      throw new Error(data.message || 'Failed to send invitation');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to send invitation');
  }
};