#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <WiFiUdp.h>



//--- Pin Definitions ---//
const int SOIL_PIN = 34; 
//-- Soil Moisture Sensor connected to GPIO 34 - pin 10--//

//--- Relative Values ---//
const double drySoilThreshold = 300.0;
const double wetSoilThreshold = 700.0;
//-- Use In-Situ Calibration Values --//




void setup() {
  Serial.begin(115200); //bits pers second since each baud = 1 bit
  pinMode(SOIL_PIN, INPUT); // Set soil moisture sensor pin as input
}

void loop() {
  // put your main code here, to run repeatedly:
  int soilMoistureValue = analogRead(SOIL_PIN); // Read the soil moisture sensor value
  double calculatedPercent = (float)(soilMoistureValue - drySoilThreshold) * 100.0 / (wetSoilThreshold - drySoilThreshold);
  int soilMoisturePercent = constrain(calculatedPercent, 0, 100); // Ensure the value is within 0-100 range
  
  Serial.print("Soil Moisture Percentage: ");
  Serial.println(soilMoisturePercent); // Print the value to Serial Monitor(Terminal)
  delay(2000); // Wait for 2 seconds before the next reading
}

