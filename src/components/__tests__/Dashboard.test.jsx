import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

// Mock the dataStore
jest.mock('@/lib/dataStore', () => ({
  getDashboardStats: () => ({
    totalSurveys: 10,
    monthlyBMTPatients: 50,
    uniqueFacilities: 5,
    avgPatientsPerFacility: 10,
  }),
  getRecentSubmissions: () => [
    {
      id: 1,
      date: '01/01/2025',
      salesperson: 'John Doe',
      physician: 'Dr. Smith',
      facility: 'General Hospital',
      location: 'New York',
      monthlyPatients: 100,
      annualPatients: 1200,
      uniqueId: 'D123',
      speciality: 'Cardiology',
      hospitalCode: 'H456',
      visitingHospitals: 3,
      bmtPatients: 20,
    },
  ],
}));

describe('Dashboard', () => {
  it('renders a heading', async () => {
    render(<Dashboard />);

    // Wait for the component to finish loading data
    const heading = await screen.findByRole('heading', {
      name: /Survey Dashboard/i,
    });

    expect(heading).toBeInTheDocument();
  });
});