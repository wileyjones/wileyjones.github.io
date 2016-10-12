% Script for Plotting the Phase Portrait of a Nonlinear Pendulum

% init system and states
g = 9.81;
L = 1;
ss = @(t,THETA) [THETA(2); -g./L*sin(THETA(1))];
THETA1 = linspace(-2*pi,2*pi,50);
THETA2 = linspace(-2*pi,2*pi,25);

% Generate Meshgrid for numerically solving
[x,y] = meshgrid(THETA1,THETA2);
size(x)
size(y)

% Establish U and V vectors
u = zeros(size(x));
v = zeros(size(y));

% Init Loop over Vector field to compute Derivatives
t = 0;
for i = 1:numel(x)
    Theta_d = ss(t,[x(i); y(i)]);
    u(i) = Theta_d(1);
    v(i) = Theta_d(2);
    Mag = sqrt(u(i)^2+v(i)^2);
    %u(i) = u(i)/Mag;
    %v(i) = v(i)/Mag;
end

%Plot our vector field
quiver(x,y,u,v,'r'); figure(gcf)
xlabel('${\theta}$','interpreter','latex')
ylabel('$\dot{\theta}$','interpreter','latex')
axis tight equal;

hold on

% Plotting Solutions for Comparison
for THETA_sol = linspace(-4*pi,4*pi,150)
    [ts,ys] = ode45(ss,[0,50],[0;THETA_sol]);
    plot(ys(:,1),ys(:,2),'b')
    plot(-ys(:,1),ys(:,2),'b')
    %plot(ys(1,1),ys(1,2),'bo') %start of contour
    %plot(ys(end,1),ys(end,2),'ks') %end of contour
end

axis([-5 5 -2*pi 2*pi])
grid on


hold off



