const API_URL = 'http://localhost:5000/api';

export const ticketService = {
  //method to get all tickets
  async createTicket(formData) {
    const token = localStorage.getItem('token');
    
    // Transform the data to match the required backend format
    const payload = {
        client_name: formData.clientName,         
        client_address: formData.clientAddress,  
        email: formData.email,                    
        phone_number: formData.phoneNumber,      
        amount: parseFloat(formData.amount),
        assigned_to: parseInt(formData.assignedTo) 
    };
    //Debug used in the development phase
    console.log('Sending payload:', payload);
    //Create new ticket request using post method
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   //include a token for authentication
        },
        body: JSON.stringify(payload)  //send a json file
    });

    const data = await response.json();    //Parse the response to json
    //handle errors for the response
    if (!response.ok) {
        //if backend handle multiple errors
        if (data.errors) {
            const errorMessage = data.errors
                .map(error => error.msg)  // Collect all error messages
                .join('. ');
            throw new Error(errorMessage);
        }
        throw new Error(data.message || 'Failed to create ticket');
    }

    return data;
  },
  //method to fetch data assigned to a broker
  async getBrokerTickets() {
    const token = localStorage.getItem('token');
    // Send GET request to fetch broker specific tickets
    const response = await fetch(`${API_URL}/tickets/broker-tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();  // Parse the response to JSON
    //check if the response is successful
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch broker tickets');
    }

    return data;
  },
  //get tickets by ticket id
  async getTicketById(serialNo) {
    const token = localStorage.getItem('token');
    
    try {
      // Send GET request to fetch ticket details by serial number
        const response = await fetch(`${API_URL}/tickets/${serialNo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch ticket details');
        }

        return data;
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
  },
};